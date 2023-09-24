import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import LoginUserResponse from '../dtos/login-response';
import { LoginUserInput } from '../dtos/login-user.input';
import { User } from 'src/app/user/schemas/user.schema';
import { CreateUserInput } from 'src/app/user/dtos/user.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => User)
  signUp(@Args('input') input: CreateUserInput) {
    return this.authService.signup(input);
  }

  @Mutation(() => LoginUserResponse)
  login(@Args('input') input: LoginUserInput,
  ): Promise<LoginUserResponse> {
    return this.authService.login(input);
  }
}
