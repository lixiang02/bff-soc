import {GraphQLInt} from 'graphql'
import {Resolver, Query, Mutation, Arg, Authorized, UseMiddleware} from 'type-graphql';
import { DemoData, InputDemo } from './type';
import { getReturnType } from '../../utils/index';
import { LogAccess } from '../../middlewares/LogAccess'
import Api from './api';

export const resolverFunctionNameTypes = {
  demo: 'demo',
  addRecipe: 'addRecipe',
  updateRecipe: 'updateRecipe',
  deleteRecipe: 'deleteRecipe'
}

export const schema = 'demo2'

@Resolver()
export default class Resolvers {
  constructor(readonly apiService: Api) {}

  @Authorized('ADMIN')
  @Query(getReturnType(DemoData, true))
  async demo(
    @Arg("page", type => GraphQLInt, { nullable: true }) page: Number,
    @Arg("size", type => GraphQLInt, { nullable: true }) size: Number,
  ):Promise<any> {
    // 业务代码。。。API调用。。。
    return await this.apiService.fetchList({ page, size });
  }
  
  @Authorized('USERS')
  @Mutation(getReturnType(DemoData))
  @UseMiddleware(LogAccess)
  async addRecipe(
    @Arg("data", { nullable: true }) data: InputDemo
   ):Promise<any> {
   return await this.apiService.fetchUpdate(data);
  }

  @Mutation(getReturnType(DemoData))
  async updateRecipe():Promise<any> {
   return await this.apiService.fetchUpdate();
  }

  @Mutation(getReturnType(DemoData))
  async deleteRecipe(
    @Arg("id") id: string
   ):Promise<any> {
   return await this.apiService.fetchDelete({ id });
  }
}
