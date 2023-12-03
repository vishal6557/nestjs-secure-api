import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      // for now secret is set as 'secret' it should be env variable but to make things simple I'm adding a string here. 
      access_token: this.jwtService.sign(payload, { secret: `${process.env.JWT_SECRET}` || 'secret' }), 
    };
  }
}
