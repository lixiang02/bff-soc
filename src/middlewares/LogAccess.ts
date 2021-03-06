import { MiddlewareInterface, ResolverData, NextFn } from "type-graphql";
import { Service } from "typedi";
import { TContext } from '../interface'

@Service()
class Logger {
  log(...args: any[]) {
    // replace with more sophisticated solution :)
    console.log(...args);
  }
}

@Service()
export class LogAccess implements MiddlewareInterface<TContext> {
    constructor(private readonly logger: Logger) {}
  
    async use({ context, info }: ResolverData<TContext>, next: NextFn) {
      const username: string = context?.currentUser && context?.currentUser?.name || "guest";
      console.log(`Logging access: ${username} -> ${info?.parentType?.name}.${info?.fieldName}`);
      return next();
    }
}