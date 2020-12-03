## typedgraphql demo

### 使用

```js
    yarn dev / start
```
- 启动 `http://localhost:3003/graphql`

### Example 

```js

  query {
      demo {
        code
        message
        data {
          name
          title
        }
      }
}
   
mutation {
  addRecipe(name: "nameeee", title: "title222" ) {
         code
        message
        data {
          name
          title
        }
  }
  deleteRecipe(id: "1111") {
    code
    message
  }
  updateRecipe{
             code
        message
        data {
          name
          title
        }
  }
}

```

### graphql 服务启动

1. 在 `package.json` 文件下的 `scripts` 下添加 `"graphql": "graphql -p 3004 -d dist/src/schema/index.js"` 命令

2. 将参数自定义修改，具体参数修改规则请看 `npx graphql --help`

- 注：目前只支持指定的schema地址文件为es5，对于ts和es6及其以上语法暂不支持

### 启动 graphql 平台步骤

1. 安装`graphql`子模块,例如`typedgraphql-demo1`
    ```js
      yarn add typedgraphql-demo1
    ```
2. 在`package.json`的属性`graphql`中增加模块名称
    ```js
      {
        "graphql": [
          "typedgraphql-demo1"
        ]
      }
    ```

3. 步骤二也可以使用主动引入代码调用,在 `src/schema/index.ts`文件中找到`ResolverType`变量在数组中增加引用
    ```js
      import TyepGraphqlDemo1 from 'typedgraphql-demo1';
      ...
      ...
      resolvers: ResolverType = [DemoResolver, TyepGraphqlDemo1] as ResolverType

    ```

4. 通过 `rollup`打包并启动打包文件
   ```js
    yarn build:rollup && yarn start:bundle
   ```

### websocket

- 支持 `websocket` 链接, 端口默认 `4000` 可以使用 `WS_POR` T环境变量修改监听端口号

客户端链接：
```typescript 
 // 链接websocket服务 
 var client = new WebSocket('ws://localhost:4000/') 

 // 添加分组全局分组， 接收分组消息, 可订阅消息
 client.send(JSON.stringify({ type: 'addGroups', data: 'global' }))

  // 添加分组模块分组， 接收分组消息, 可订阅消息
 client.send(JSON.stringify({ type: 'addGroups', data: 'moudle' }))

  // 添加分组模块分组， 接收分组消息, 可订阅消息
 client.send(JSON.stringify({ type: 'addGroups', data: 'custom' }))

   // 添加分组模块分组， 接收分组消息, 可订阅消息, 带参数
 client.send(JSON.stringify({ type: 'addGroups', data: { key: 'moudle', params: { page: 1, pageSize: 10 } } }))


  // 订阅轮训消息
 client.send(JSON.stringify({ type: 'subscription', data: null }))

 // 移除分组，不再接收分组消息
 client.send(JSON.stringify({ type: 'removeGroups', data: 'moudle' }))

 // 通知分组的成员消息,所有监听 `userModule`  的分组链接都会接收到 `{ type: 'addUser' }` 消息
 client.send(JSON.stringify({ type: 'notificationMessage', :data: { type: 'addUser', group: 'userModule' } }))

```
客户端接收 `message` 消息，返回数据结构为

```json
[
  {
    "key": "groupName",
    "data": "当前组获取数据"
  }
]
```