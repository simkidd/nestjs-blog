import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/app/user/schemas/user.schema';
import { PostComment } from './comment.schema';

@ObjectType()
@Schema({ timestamps: true })
export class Post {
  @Field()
  id: string;

  @Field()
  @Prop()
  title?: string;

  @Field()
  @Prop()
  body?: string;

  @Field(() => [String])
  @Prop()
  images?: string[];

  @Field()
  @Prop()
  category?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  slug?: string;

  @Field(() => [String])
  @Prop()
  tags?: string[];

  @Field(() => User, { nullable: true })
  @Prop({ type: Types.ObjectId, ref: 'User' })
  author?: User;

  @Field(() => [User])
  @Prop({ type: Types.ObjectId, ref: 'User' })
  likes?: User[];

  @Field(() => [PostComment])
  @Prop({ type: Types.ObjectId, ref: 'PostComment' })
  comments?: PostComment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);

