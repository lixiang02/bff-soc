interface QueryType {
  demo: string;
}

interface queryResultType {
  data: DemoType;
}

interface DemoType {
  demo?: DemoData;
}

interface DemoData {
  code: number;
  message: string;
  data: any;
}

class Base {
  static mockApiByUrlKeyList(urlKeys: string[]) {
    return ({url}) => {
      if (!Array.isArray(urlKeys)) {
        urlKeys = [urlKeys];
      }
      let urlKey = '';
      for (const key of urlKeys) {
        if (url.indexOf(Query.apiUrls[key]) !== -1) {
          urlKey = key;
          break;
        }
      }
      return Query.getMockApiResponseByUrl(urlKey);
    };
  }

  static getMockApiResponseByUrl(url: string) {
    return Promise.resolve().then(res =>
      JSON.stringify(Query.mockApiResponse[url] || {})
    );
  }
}

class Query extends Base {
  static operation: string = 'query';
  static query: QueryType = {
    demo: `${Query.operation} {
            demo {
                code
                message
                data {
                  total
                  list {
                    title
                    name
                  }
                }
            }
        }
        `
  };
  static apiUrls: Object = {
    latestaccess: '/test'
  };
  static mockApiResponse: Object = {
    demo: {
      code: 0,
      message: 'success',
      data: {
        total: 100,
        list:[
          {
            title: 'title',
            name: 'name'
          }
        ]
      }
    }
  };
  static queryResult: queryResultType = {
    data: {
      demo: {
        code: 0,
        message: 'success',
        data: {
          total: 100,
          list: [
            {
              title: 'title',
              name: 'name'
            }
          ]
        }
      }
    }
  };
}

export default Query;
