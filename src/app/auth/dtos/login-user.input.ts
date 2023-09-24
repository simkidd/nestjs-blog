import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class LoginUserInput {
  @IsEmail()
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class ForgotPasswordInput {
  @Field(() => String)
  emailToken: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class UpdatePasswordInput {
  @Field(() => String)
  password: string;

  @Field(() => String)
  oldPassword: string;
}
