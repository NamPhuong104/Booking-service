import { DatabaseService } from 'src/database/database.service';

export class BaseService<CreateDto, UpdateDto> {
  constructor(
    protected databaseService: DatabaseService,
    protected readonly modalName: string,
  ) {}

  findMany() {
    return this.databaseService[this.modalName].findMany();
  }

  create(data: CreateDto) {
    return this.databaseService[this.modalName].create({ data });
  }

  //   updateById() {}

  //   findById() {}

  //   findOrFailById() {}
}
