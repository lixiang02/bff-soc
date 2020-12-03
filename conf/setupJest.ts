/// <reference path="../types/global.d.ts" />

//setupJest.js or similar file
import 'reflect-metadata'
import * as packageData from '../package.json'
import {enableFetchMocks} from "jest-fetch-mock";
import fetch from 'cross-fetch'

enableFetchMocks()
global.fetch = global.fetch || fetch;
global.API_PREFIX = global.API_PREFIX || packageData.config.API_PREFIX_MOCK 
global.api_server_prefix = global.api_server_prefix || packageData.config.API_SERVER_PREFIX_MOCK
