/// <reference path="../../../types/global.d.ts" />

import {FetchUtils } from '@mcfed/utils';
import { ResponseProcess } from '../../decorators'

export default class Api {
  
  @ResponseProcess()
  async fetchList(params={}, headers = {}):Promise<any> {
      return FetchUtils.fetchGet(`${API_PREFIX}/list`, {
        body: JSON.stringify(params),
        headers
      })
  }
  
  @ResponseProcess()
  async fetchUpdate(params:any = {}, headers = {}):Promise<any> {
    return FetchUtils.fetchPost(`${API_PREFIX}/update`, {
      body: JSON.stringify(params),
      headers
    })
  }

  @ResponseProcess()
  async fetchDelete(params:any = {}, headers = {}):Promise<any> {
    return FetchUtils.fetchDelete(`${API_PREFIX}/delete`, {
      body: JSON.stringify(params),
      headers
    })
  }
}