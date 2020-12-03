import {ObjectType, Field, InputType, InterfaceType } from 'type-graphql';

@InterfaceType()
class Demo {
  @Field(type=>String, {nullable: true})
  name?: string;
  @Field(type=>String, {nullable: true})
  title?: string;
}

@ObjectType({description: 'demo data desc', implements: Demo })
export class DemoData extends Demo {}

// input 类型不允许继承
@InputType({description: 'demo input desc' })
export class InputDemo {
  @Field(type=>String, {nullable: true})
  name?: string;
  @Field(type=>String, {nullable: true})
  title?: string;
}
