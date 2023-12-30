import { PrismaClient } from '@prisma/client'
import { injectable } from 'inversify';
import { DatabaseClient } from './database-client.interface.js';


@injectable()
export class PrismaService extends PrismaClient implements DatabaseClient {
  async connect() {
    await this.$connect();
  }

  async disconnect() {
    await this.$disconnect();
  }
}
