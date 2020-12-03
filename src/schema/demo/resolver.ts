import {GraphQLInt} from 'graphql'
import {Resolver, Query, Mutation, Arg, Authorized, UseMiddleware, Ctx} from 'type-graphql';
import { DemoData, InputDemo } from './type';
import { getReturnType, setApiContent } from '../../utils/index';
import { LogAccess } from '../../middlewares'
import { SetHeaders } from '../../decorators'
import Api from './api';
import { Context } from 'vm';

export const resolverFunctionNameTypes = {
  demo: 'demo',
  addRecipe: 'addRecipe',
  updateRecipe: 'updateRecipe',
  deleteRecipe: 'deleteRecipe'
}

export const schema = 'demo'

@Resolver()
export default class Resolvers {
  constructor(readonly apiService: Api) {}

  @Authorized('ADMIN')
  @Query(getReturnType(DemoData, true))
  @UseMiddleware(LogAccess)
  async demo(
    @Arg("page", type => GraphQLInt, { nullable: true }) page: Number,
    @Arg("size", type => GraphQLInt, { nullable: true }) size: Number,
    @SetHeaders() headers: any,
    @Ctx() ctx: Context
  ):Promise<any> {
    // 业务代码。。。API调用。。。
    setApiContent(ctx, ['/list'])
    return await this.apiService.fetchList({ page, size }, headers);
  }
  
  @Authorized('USERS')
  @Mutation(getReturnType(DemoData))
  @UseMiddleware(LogAccess)
  async addRecipe(
    @Arg("data", { nullable: true }) data: InputDemo,
    @SetHeaders() headers: any,
    @Ctx() ctx: Context
   ):Promise<any> {
    setApiContent(ctx, ['/update'])
   return await this.apiService.fetchUpdate(data, headers);
  }

  @Mutation(getReturnType(DemoData))
  async updateRecipe(
    @SetHeaders() headers: any,
    @Ctx() ctx: Context
  ):Promise<any> {
    setApiContent(ctx, ['/update'])
   return await this.apiService.fetchUpdate({}, headers);
  }

  @Mutation(getReturnType(DemoData))
  async deleteRecipe(
    @Arg("id") id: string,
    @SetHeaders() headers: any,
    @Ctx() ctx: Context
   ):Promise<any> {
    setApiContent(ctx, ['/delete'])
   return await this.apiService.fetchDelete({ id }, headers);
  }
}
