declare var API_PREFIX: string;
declare var api_server_prefix: string;
declare namespace NodeJS  {
  interface Global {
    API_PREFIX: string;
    api_server_prefix: string;
    fetch: any;
    fetchMock: any;
  }
}