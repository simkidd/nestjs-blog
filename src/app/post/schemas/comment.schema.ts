import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/app/user/schemas/user.schema';
import { Post } from './post.schema';

@ObjectType()
@Schema({ timestamps: true })
export class PostComment {
  @Field()
  id: string;

  @Field()
  @Prop()
  comment: string;

  @Field(() => User)
  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: User;

  @Field(() => [User])
  @Prop({ type: Types.ObjectId, ref: 'User' })
  likes: User[];

  @Field(() => Post)
  @Prop({ type: Types.ObjectId, ref: 'Post' })
  post: Post;
}

export const PostCommentSchema = SchemaFactory.createForClass(PostComment);
