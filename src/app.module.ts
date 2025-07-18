import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlsModule } from './urls/urls.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UrlsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
