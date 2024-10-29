import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseService } from 'src/common/service/base.service';
import { DatabaseService } from 'src/database/database.service';
import { CreateSessionByCoachDto } from './dto/create-session-by-coach.dto';
import { credentialService } from '../credential/credential.service';
import dayjs from 'dayjs';

@Injectable()
export class SessionService extends BaseService<
  Prisma.SessionCreateInput,
  Prisma.SessionUpdateInput
> {
  constructor(
    databaseService: DatabaseService,
    private credentialService: credentialService,
  ) {
    super(databaseService, 'session');
  }

  async createSession(data: CreateSessionByCoachDto) {
    const newSession = await this.create(data);

    // TODO: extract information from database
    await this.credentialService.createGoogleEvent(data.coachId, {
      summary: 'Title', // extract from session template
      description: 'description', // extract from session template
      start: {
        dateTime: dayjs(newSession.startAt).format(),
      },
      end: {
        dateTime: dayjs(newSession.startAt).add(30, 'minute').format(),
      },
      attendees: [], // coach, client
    });

    return newSession;
  }
}
