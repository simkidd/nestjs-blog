import { Module } from '@nestjs/common';
import { PostResolver } from './resolvers/post.resolver';
import { PostService } from './services/post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
    ]),
    ConfigModule.forRoot({
      cache: true,
    }),
  ],
  providers: [PostResolver, PostService],
})
export class PostModule {}
