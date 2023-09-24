import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ChangeStatusInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  status: string;
}