import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserInput, UploadImageInput } from '../dtos/user.dto';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { cloudinaryUpload } from 'src/app/utils/cloudinary';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly configService: ConfigService
  ) { }
  logger = new Logger(UserService.name)

  // get all users
  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userModel.find();

      return users;
    } catch (error) {
      this.logger.error(error)
      throw error;
    }
  }

  // get single user by id
  async getUserById(id: String): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException('User Id not found');
      }
      return user;
    } catch (error) {
      this.logger.error(error)
      throw error;
    }
  }

  // update user
  async updateUser(id: String, input: UpdateUserInput): Promise<User> {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, input, {
        new: true,
      });
      if (!user) {
        throw new NotFoundException('User Id not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  // delete user
  async deleteUser(id: String): Promise<User> {
    try {
      const user = await this.userModel.findByIdAndRemove(id);
      if (!user) {
        throw new NotFoundException('User Id not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  // get user by email
  async getUserByEmail(email: String): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new NotFoundException('Email not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  // upload profile image
  async uploadProfilePic(input: UploadImageInput): Promise<User> {
    const { id, image: file } = input;
    try {
      const user = await this.userModel.findById({ id });
      if (!user) {
        throw new NotFoundException('User not valid');
      }
      const image = await cloudinaryUpload(file).catch((err) => {
        console.log(err);
        throw new Error('Problem with uploading image');
      })

      user.image = image;

      await user.save();

      return user
    } catch (error) {
      throw error
    }
  }

  async decodeJWT(jwt: string): Promise<User> {
    if (!jwt) return null;
    const token = jwt.split(" ")[1];

    if (!token) return null;

    try {
      const { id } = verify(token, this.configService.get<string>('JWT_SECRET')) as { id: string };
      const user = await this.userModel.findById(id);
      return user
    } catch (error) {
      console.log("Invalid signature")
      return null
    }
  }

}
