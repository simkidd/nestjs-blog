import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ChangeRoleInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  role: string;
}