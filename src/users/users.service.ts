import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async create(username: string, pass: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(pass, 10);
    this.users.push({ username, password: hashedPassword });
    console.log(`User is created with usernam ${username} and encrypted password ${hashedPassword}`)
  }
}
