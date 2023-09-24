import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserInput } from '../dtos/login-user.input';
import { User } from 'src/app/user/schemas/user.schema';
import { UserService } from 'src/app/user/services/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from 'src/app/user/dtos/user.dto';
import { JwtService } from '@nestjs/jwt';
import LoginUserResponse from '../dtos/login-response';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generateFullName } from 'src/app/utils/helpers';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  // generate JWT tokens
  async generateJwt(user: User): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload)
    return `Bearer ${token}`;
  }

  async validateUser(input: LoginUserInput): Promise<User> {
    try {
      const user = await this.userService.getUserByEmail(input.email);

      const isMatch = await bcrypt.compare(input.password, user.password);

      if (!user && !isMatch) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async signup(input: CreateUserInput): Promise<User> {
    const { email, password } = input
    try {
      // CHECK IF THE USER ALREADY EXISTS
      const existingUser = await this.userModel.findOne({ email });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
      // generate hash password
      const salt = await bcrypt.genSalt();
      const hashPsw = await bcrypt.hash(password, salt);

      // Generate the full name using the generateFullName function
      const fullName: string = generateFullName({
        firstName: input.firstName,
        lastName: input.lastName,
      });

      const user = new this.userModel({
        ...input,
        name: fullName,
        password: hashPsw
      })

      await user.save();

      return user
    } catch (error) {
      throw error;
    }
  }

  async login(input: LoginUserInput): Promise<LoginUserResponse> {
    const { email, password } = input;
    try {
      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        throw new NotFoundException('Invalid credentials')
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        throw new Error('Password incorrect')
      }

      // generate a JWT token and return it
      const authToken = await this.generateJwt(user)

      if (!authToken) {
        throw new InternalServerErrorException();
      }

      return {
        authToken,
        id: user.id,
        role: user.role,
        status: user.status
      };
    } catch (error) {
      throw error;
    }
  }
}
