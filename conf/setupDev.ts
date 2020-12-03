import fetch from 'cross-fetch';
import * as packageData from '../package.json';

global.fetch = global.fetch || fetch;
global.API_PREFIX = global.API_PREFIX || (
    process.env['NODE_ENV'] === 'development' ?
        packageData.config.API_PREFIX_MOCK :
        packageData.config.API_PREFIX
)
global.api_server_prefix = global.api_server_prefix || (
    process.env['NODE_ENV'] === 'development' ?
        packageData.config.API_SERVER_PREFIX_MOCK :
        packageData.config.API_SERVER_PREFIX
)
// @ts-ignore
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';