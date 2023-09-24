import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  gender?: "Male" | "Female";

  @Field({ nullable: true })
  dob?: string;

  @Field(() => String,{ nullable: true })
  phone?: string;
}

@InputType()
export class UploadImageInput {
  @Field()
  id: string;

  @Field()
  image?: string
}