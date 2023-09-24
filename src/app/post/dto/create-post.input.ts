import { InputType, Field } from '@nestjs/graphql';
import { User } from 'src/app/user/schemas/user.schema';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  body: string;

  @Field(() => [String], { nullable: true })
  images: string[];

  @Field(() => [String])
  tags: string[];

  @Field()
  category: string;

}