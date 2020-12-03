/// <reference path="../../types/global.d.ts" />

import 'reflect-metadata'
import { GraphQLSchema } from 'graphql';
import { buildSchemaSync, NonEmptyArray } from 'type-graphql';
import { Container } from 'typedi';

import { customAuthChecker } from '../utils/auth-checker';
import { LogAccess } from '../middlewares/LogAccess';
import * as packageData from '../../package.json';

import DemoResolver, { schema as DemaSchema } from './demo/resolver'
import Demo2Resolver, { schema as Dema2Schema } from './demo2/resolver'

const schemas = []
const resolvers = [
    { schema: DemaSchema, resolver:  DemoResolver},
    { schema: Dema2Schema, resolver: Demo2Resolver } 
] as unknown as ResolversDataType;


type ResolversType = NonEmptyArray<Function> | NonEmptyArray<string>
type ResolverType = Function | string
interface ResolverDataType {
    schema: string;
    resolver: ResolverType
}
type ResolversDataType = Array<ResolverDataType>
interface Schemas {
    schemaName: string;
    schema: GraphQLSchema;
}

class Schema {
    protected resolvers: ResolversDataType
    protected schemas: Array<Schemas>
    constructor() {
        this.schemas = schemas
        this.resolvers = resolvers
        this.generaterResovers()
    }
    getSchema(key:string='demo') {
        return this.generaterSchema(key)
    }
    protected generaterSchema(schemaName: string): GraphQLSchema {
        let resolvers = [DemoResolver] as ResolversType
        resolvers = this.getResolverBySchemaName(schemaName)
        if (!resolvers.length) {
            console.log('not found new module', schemaName)

            // 新模块不存在模块查询老模块
            return this.getOldSchemaBySchemaName(schemaName)
        }
        console.log('it is new module', schemaName)

        return buildSchemaSync({
            authChecker: customAuthChecker,
            container: Container,
            globalMiddlewares: [LogAccess],
            resolvers,
            validate: true
        });
    }
    protected getOldSchemaBySchemaName(schemaName: string): GraphQLSchema {
        const schemasTmp = this.schemas.filter(e => e.schemaName === schemaName)
        if (!schemasTmp.length) { throw new Error('schema not found') }
        return schemasTmp[0] && schemasTmp[0].schema as GraphQLSchema
    }
    protected getResolverBySchemaName(schemaName: string): ResolversType {
        return this.resolvers
            .filter(e => e.schema === schemaName)
            .map(e => e.resolver) as ResolversType
    }
    protected generaterResovers() {
        this.generaterResoversByConfig()
        this.generaterResolversByPackageName()
    }
    protected generaterResoversByConfig() {
        const resolversName = packageData?.graphqls
        if (!resolversName || !resolversName.length) { return }
        resolversName
            .map(resolverName => require(`${resolverName}/package.json`))
            .map(e => require(`${e.name}/${e.graphql}`))
            .filter(m => m.schema && typeof m.schema === 'string' && m.default)
            .map(m => ({ schema: m.schema, resolver: m.default }))
            .map(n => this.addResolver(n))
    }
    protected generaterResolversByPackageName() {
        // 之后增加这个配置
    }
    protected addResolver(module: ResolverDataType) {
        const resolvers = this.resolvers as ResolversDataType
        resolvers.push(module)
        this.resolvers = resolvers as ResolversDataType
    }
    find(filePath:string): GraphQLSchema {
        try {
            const schema = require(filePath)
            if (!schema) { throw new Error('not found schema file') }
            return schema.default ? schema.default : schema
        } catch (error) {
            console.error(error)
            process.exit(1)
        }
    }
}

export default new Schema()