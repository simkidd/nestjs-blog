import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from '../schemas/post.schema';
import { PostService } from '../services/post.service';
import { CreatePostInput } from '../dto/create-post.input';
import { UpdatePostInput } from '../dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/app/auth/guards/jwt-auth.guard';
import { User } from 'src/app/user/schemas/user.schema';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) { }

  // get all posts
  @Query(() => [Post])
  getPosts(): Promise<Post[]> {
    return this.postService.getPosts();
  }

  // get a single post by Id
  @Query(() => Post)
  getPostById(@Args('id') id: String): Promise<Post> {
    return this.postService.getPostById(id);
  }

  // create a new post
  @Mutation(() => Post)
  async createPost(
    @Args('input') input: CreatePostInput,
    @Context('user') user: User): Promise<Post> {

    return this.postService.createPost(input, user);
  }

  // update a post 
  @Mutation(() => Post)
  updatePost(@Args('input') input: UpdatePostInput): Promise<Post> {
    return this.postService.updatePost(input.id, input);
  }

  // delete a post
  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  deletePost(@Args('id') id: String) {
    return this.postService.deletePost(id);
  }
}
