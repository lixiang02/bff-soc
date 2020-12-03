import { GraphQLInt } from 'graphql'

export interface User {
    id: number;
    name: string;
}

export interface TContext {
    response(arg0: string, response: any);
    currentUser: User;
}

export interface PagernateQuery {
    page: typeof GraphQLInt
    size: typeof GraphQLInt
}