import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import 'dotenv/config';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_MYSQL_HOST,
      port: +process.env.DB_MYSQL_PORT,
      username: process.env.DB_MYSQL_USERNAME,
      password: process.env.DB_MYSQL_PASSWORD,
      database: process.env.DB_MYSQL_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),  
    UsersModule
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
