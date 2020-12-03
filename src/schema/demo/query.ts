import { query, mutation } from 'gql-query-builder'
import {PagernateQuery } from '../../interface'
const commonQuery = [
    'name',
    'title'
]
export const resolverFunctionNameTypes = {
  demo: 'demo',
  addRecipe: 'addRecipe',
  updateRecipe: 'updateRecipe',
  deleteRecipe: 'deleteRecipe'
}
const getBaseResponseQuery = (data:Array<any>) => {
    return [
        'code', 
        'message', 
        {
          data
        }
    ]
}

const getBaseList = (list: Array<any>) => {
  return [
    'pageSize',
    'currentPage',
    'total',
    {
      list
    }
  ]
}


export const demoQuery = (variables: PagernateQuery) => query({
  operation: resolverFunctionNameTypes.demo,
  variables,
  fields: getBaseResponseQuery(getBaseList(commonQuery))
})

export const mutationAddRecipe = (variables: any) => mutation({
  operation: resolverFunctionNameTypes.addRecipe,
  variables,
  fields: getBaseResponseQuery(commonQuery)
})

export const mutationUpdateRecipe = (variables: any) => mutation({
  operation: resolverFunctionNameTypes.updateRecipe,
  variables,
  fields: getBaseResponseQuery(commonQuery)
})


export const mutationDeleteRecipe = (variables: any) => mutation({
  operation: resolverFunctionNameTypes.deleteRecipe,
  variables,
  fields: getBaseResponseQuery(commonQuery)
})