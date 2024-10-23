import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  findMany() {
    return this.databaseService.user.findMany();
  }

  async create(data: Prisma.UserCreateInput) {
    const hashedPassword = await this.hashPassword(data.password);

    const userData = {
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      timezoneCode: data.timezoneCode,
    };
    return this.databaseService.user.create({
      data: userData,
    });
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
