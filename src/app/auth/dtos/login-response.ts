import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class LoginUserResponse {
  @Field()
  id: string;

  @Field(() => String)
  authToken: string;

  @Field()
  role: string;

  @Field()
  status: string;
}
