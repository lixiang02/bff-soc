import {createParamDecorator} from 'type-graphql';

export function SetHeaders() {
    return createParamDecorator<{context}>(({root}) => {
      const headers = { 
        'Cookie': `SESSION=${root?root.SESSION:'none'};`,
        'x-forwarded-for': root ? root.HOST : '',
        'Content-Type': 'application/json',
      }
      return Object.assign({}, headers);
    });
}