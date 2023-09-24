import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../schemas/post.schema';
import { Model } from 'mongoose';
import { CreatePostInput } from '../dto/create-post.input';
import { UpdatePostInput } from '../dto/update-post.input';
import { User } from 'src/app/user/schemas/user.schema';
import { generateSlug } from 'src/app/utils/helpers';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>
  ) { }

  // create post
  async createPost(input: CreatePostInput, author: User): Promise<Post> {
    try {
      const post = new this.postModel({
        ...input,
        author,
        slug: generateSlug(input.title)
      });

      await post.save();
      return post;
    } catch (error) {
      throw error;
    }
  }

  // getPosts
  async getPosts(): Promise<Post[]> {
    try {
      const posts = await this.postModel.find().populate({
        path: "author",
        select: ["firstName", "lastName"]
      });

      return posts;
    } catch (error) {
      throw error;
    }
  }
  // getPostById
  async getPostById(id: String): Promise<Post> {
    try {
      const post = await this.postModel.findById(id);
      if (!post) {
        throw new NotFoundException('Post Id not found');
      }

      return post;
    } catch (error) {
      throw error;
    }
  }
  // getPostBySlug
  // updatePost
  async updatePost(id: String, input: UpdatePostInput): Promise<Post> {
    try {
      const post = await this.postModel.findByIdAndUpdate(id, input, {
        new: true,
      });
      if (!post) {
        throw new NotFoundException('Post Id not found');
      }

      return post;
    } catch (error) {
      throw error;
    }
  }
  // deletePost
  async deletePost(id: String) {
    try {
      const post = await this.postModel.findByIdAndRemove(id);
      if (!post) {
        throw new NotFoundException('Post Id not found');
      }

      return post;
    } catch (error) {
      throw error;
    }
  }
}
