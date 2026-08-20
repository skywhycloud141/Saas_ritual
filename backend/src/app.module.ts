import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgencyModule } from './agency/agency.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AssetController } from './asset/asset.controller';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [AgencyModule, PrismaModule, ConfigModule.forRoot({isGlobal:true}), ProjectModule, AuthModule,ServeStaticModule.forRoot({rootPath:join(__dirname, "..","uploads"), serveRoot:"/uploads/"}), CatalogModule],
  controllers: [AppController, AssetController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
