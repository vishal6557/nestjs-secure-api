import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const { username, password } = body;
    const userExists = await this.usersService.findOne(username);
    if (userExists) {
      throw new BadRequestException('Username already exists');
    }
    await this.usersService.create(username, password);
    return { message: 'User created successfully' };
  }

  @Post('login')
  async login(@Body()  body: CreateUserDto) {
    const { username, password } = body;
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    const jwtToken = this.authService.login(user);
    console.log(`User ${username} is succesfully loggedIn.`)
    return jwtToken;
  }
}
