import { graphql } from 'graphql';
import Q from './utils/query';
import schema from './utils/schema';

const defaultInit = {
  headers: {
    'Content-Type': 'application/json'
  }
}

// 接口测试
describe('demo resolver test', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('getfetch success', async () => {
    fetchMock.mockResponse(JSON.stringify(Q?.queryResult?.data?.demo), defaultInit)
    const res = await graphql(schema, Q?.query?.demo);
    expect(res?.data?.demo).toEqual(Q?.queryResult?.data?.demo);
  });
});




