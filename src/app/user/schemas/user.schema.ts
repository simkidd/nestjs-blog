import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { UserRole } from '../enums/role.enum';
import { UserStatus } from '../enums/status.enum';
import { Post } from 'src/app/post/schemas/post.schema';

// Register the enum type for GraphQL
registerEnumType(UserRole, {
  name: 'UserRole',
});

// Register the enum type for GraphQL
registerEnumType(UserStatus, {
  name: 'UserStatus',
});

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field()
  id: string;

  @Field(() => String, { nullable: true })
  @Prop()
  name?: string;

  @Field(() => String)
  @Prop()
  firstName: string;

  @Field(() => String)
  @Prop()
  lastName: string;

  @Field(() => String)
  @Prop()
  email: string;

  @Field(() => String)
  @Prop()
  password: string;

  @Field(() => String, { nullable: true })
  @Prop()
  bio?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  image?: string;

  @Field(() => String, { nullable: true })
  gender?: "Male" | "Female";

  @Field({ nullable: true })
  dob?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field(() => UserRole)
  @Prop({
    enum: UserRole,
    default: UserRole.user,
  })
  role?: UserRole;

  @Field(() => [Post], { nullable: true })
  @Prop({ type: Types.ObjectId, ref: "Post" })
  posts?: Post[]

  @Field(() => UserStatus)
  @Prop({
    enum: UserStatus,
    default: UserStatus.active,
  })
  status?: UserStatus;

  @Field(() => Boolean)
  @Prop({ default: false })
  isVerified?: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);
