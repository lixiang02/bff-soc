import graphqlHTTP from 'koa-graphql';
import { Context } from 'vm';
import schemaObject from '../schema';

export function graphql() {
    return async function (ctx:any, next:any) {
        let url = ctx.url
        if (!/^\/graphql/.test(url)) { await next() }
        const optName = getOperationNameByUrl(url, 'graphql')
        ctx.set('Api-Type', 'graphql');
        const middleware = graphqlHTTP((req: any, res: any, ctx:Context) => {           
            let HOST = '';
            if (ctx?.req) {
                HOST = ctx?.req?.headers['x-forwarded-for'] || ctx?.req?.connection?.remoteAddress;
                HOST = HOST?.replace('::ffff:', '');
            }
            let operationName = req?.body?.operationName
            if (optName && !operationName) {
                operationName = optName
            }
            return {
                schema: schemaObject.getSchema(operationName),
                rootValue: {
                    HOST,
                    SESSION: ctx?.cookie?.SESSION,
                    variables: req?.body?.variables
                },
                graphiql: true //启用GraphiQL
            };
        })
        await middleware(ctx, next)
    }
}

function getOperationNameByUrl(url:string, exclude:string='') {
    if (!url || typeof url !== 'string') { return '' }
    url = url.substring(0, Number(url.indexOf('?')))
    let keys = url.split('/').filter(_ => _ && _ !== exclude)
    return keys[0]
}