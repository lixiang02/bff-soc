import {buildSchemaSync} from 'type-graphql';
import { Container } from 'typedi';
import Resolver from '../../resolver';
import { customAuthChecker } from '../../../../utils/auth-checker';

export default buildSchemaSync({
    resolvers: [Resolver],
    authChecker: customAuthChecker,
    container: Container
});