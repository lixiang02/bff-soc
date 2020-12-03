import {FetchUtils } from '@mcfed/utils';

export default class Api {
  async fetchList(params={}, headers = {}):Promise<any> {
      return FetchUtils.fetchGet(`${API_PREFIX}/list`, {
        body: JSON.stringify(params),
        headers
      })
  }
  async fetchUpdate(params:any = {}, headers = {}):Promise<any> {
    return FetchUtils.fetchPost(`${API_PREFIX}/update`, {
      body: JSON.stringify(params),
      headers
    })
  }
  async fetchDelete(params:any = {}, headers = {}):Promise<any> {
    return FetchUtils.fetchDelete(`${API_PREFIX}/delete`, {
      body: JSON.stringify(params),
      headers
    })
  }
}