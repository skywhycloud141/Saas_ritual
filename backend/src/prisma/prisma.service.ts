import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
    constructor(private configService: ConfigService){
        const adapter = new PrismaBetterSqlite3({url:configService.getOrThrow(`DATABASE_URL`)})
        super({adapter})
    }
    async onModuleInit() {
        await this.$connect();
    }
}
