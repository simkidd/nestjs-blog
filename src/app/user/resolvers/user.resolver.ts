import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { User } from '../schemas/user.schema';
import { UpdateUserInput } from '../dtos/user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/app/auth/guards/jwt-auth.guard';
import { Roles } from 'src/app/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/app/auth/guards/roles.guard';
import { UserRole } from '../enums/role.enum';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Query(() => User)
  getUserById(@Args('id', { type: () => String }) id: String): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Query(() => User)
  getUserByEmail(@Args('email') email: string): Promise<User> {
    return this.userService.getUserByEmail(email);
  }

  @Mutation(() => User)
  updateUser(@Args('input') input: UpdateUserInput) {
    return this.userService.updateUser(input.id, input);
  }

  @Mutation(() => User)
  deleteUser(@Args('id') id: String) {
    return this.userService.deleteUser(id);
  }
}