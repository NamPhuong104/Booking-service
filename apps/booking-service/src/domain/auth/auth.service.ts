import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { NotFoundError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const foundUser = await this.userService.findOneOrFailByEmail(email);

    const isMatched = await this.userService.comparePassword(
      password,
      foundUser.password,
    );

    if (!isMatched) {
      throw new NotFoundException('User or password incorrect');
    }

    const payload = {
      sub: foundUser.id,
      email: foundUser.email,
      //TODO: add role
    };

    const jwt = await this.jwtService.signAsync(payload);

    return { jwt, payload };
  }
}
