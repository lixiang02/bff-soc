import {ObjectType, Field, ClassType} from 'type-graphql';
import * as path from 'path'
import * as fs from 'fs'
import { Context } from 'vm';

const ObjectMap = new Map()

// 公共返回结构
export function BaseResponse<T>(TItemClass:ClassType<T>):ClassType {
    @ObjectType({ isAbstract: true })
    class BaseResponseClass {
      @Field(type=>Number)
      code?: number;
    
      @Field(type=>String)
      message?: string;
    
      @Field(type => TItemClass, { nullable: true })
      data?: T;
    }
    return BaseResponseClass
}


export function BasePagernationResponse():ClassType {
    @ObjectType({ isAbstract: true })
    class BasePagernationClass {
      @Field(type=>Number)
      pageSize?: number;
    
      @Field(type=>Number)
      currentPage?: number;
    
      @Field(type=>Number)
      total?: number;
    }
    return BasePagernationClass
}


export function BaseListResponse<T>(TItemClass:ClassType<T>):ClassType {
    @ObjectType({ isAbstract: true })
    class BaseListResponseClass extends BasePagernationResponse() {
      @Field(type => [TItemClass], { nullable: true })
      list?: T[];
    }
    return BaseListResponseClass
}
export function BaseType<T>(ItemType:ClassType<T>) {
    const itemName = ItemType.name
    const BaseObject = ObjectMap.get(itemName)
    if (BaseObject) { return BaseObject }
    @ObjectType()
    class Base extends BaseResponse<T>(ItemType) {}

    ObjectMap.set(itemName, Base)
    return Base;
}
export function BaseListType<T>(ItemType:ClassType<T>) {
    const itemName = ItemType.name
    const BaseObject = ObjectMap.get(itemName)
    if (BaseObject) { return BaseObject }
    @ObjectType()
    class BaseList extends BaseResponse<T>(BaseListResponse(ItemType)) {}

    ObjectMap.set(itemName, BaseList)
    return BaseList;
}

// 获取返回类型
export function getReturnType<T>(TYPE: ClassType<T>, pagination?: Boolean) {
    const RETURNS_TYPE = pagination ? BaseListType(TYPE) : BaseType(TYPE)
    return returns => RETURNS_TYPE
}

/**
 * 获取全部的 resolvers 模块
 * 
 * @param {string} resolverModuleDir 可选，resolver模块公共路径，默认为项目下的src/graphql目录
 * @param {string} resolverFileName  可选，resolver文件名称，且默认导出，默认值为resolve
 * @returns {Array<Function>} 返回 Resolver Modules
 */ 
export function getResolvers(
    resolverModuleDir:string=path.resolve(__dirname, 'graphql'), 
    resolverFileName:string='resolver') {
    
    const modulesDirs:Array<string> = fs.readdirSync(resolverModuleDir)
    return modulesDirs
        .map(mName => {
            const dPath = path.resolve(resolverModuleDir, mName)
            const lstate = fs.lstatSync(dPath)
            if (!lstate.isDirectory()) { return null }
            return dPath
        })
        .filter(e => e)
        .map(dPath => {
            if (!dPath) return null
            const rPath = path.resolve(dPath, resolverFileName)
            //@ts-ignore
            const rModule = require(rPath)
            return rModule?.default
        })
        .filter(e => e)
}

export function getBaseResponseQuery (data:any) {
    return [
        'code', 
        'message', 
        {
            data
        }
    ]
}

export function setApiContent(ctx: Context, apiList=[]) {
    ctx?.set('Api-Content', Array.isArray(apiList) ? apiList.join(',') : JSON.stringify(apiList));
}