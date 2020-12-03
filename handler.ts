import 'reflect-metadata'
import {graphql, GraphQLSchema} from 'graphql'
import schema from './src/schema'

export async function main(event:{data:string, operationName: string}, context) {
  const query=event.data
  const operationName= event.operationName
  return await graphql(schema.getSchema(operationName) as GraphQLSchema, query) ;
}
