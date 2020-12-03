import {getIntrospectionQuery, graphqlSync} from 'graphql';
import {DemoData} from '../type';
import schema from './utils/schema'

const introspection = graphqlSync(
  schema,
  getIntrospectionQuery()
);

describe('demo introspection test', () => {
  // Type
  it('type type field length success', async () => {
    (expect as any)(introspection).toTypeChildLen(DemoData, 2);
  });

  it('type DemoData field success', async () => {
    (expect as any)(introspection).toTypeFields(DemoData, {
      title: String,
      name: String
    });
  });
});
