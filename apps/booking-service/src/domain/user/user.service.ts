import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { BaseService } from '../../common/service/base.service';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class UserService extends BaseService<
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput
> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, 'user');
  }

  async createWithHash(data: Prisma.UserCreateInput) {
    const hashedPassword = await this.hashPassword(data.password);

    const userData = {
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      timezoneCode: data.timezoneCode,
    };
    return this.create(userData);
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async findOneOrFailByEmail(email: string) {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
