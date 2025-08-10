import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ProjectsModule } from './projects/projects.modules';
import { UserModule } from './user/user.module';
import { BugModule } from './Bugs/bug.module';

import { ConfigModule , ConfigService } from '@nestjs/config';
import config from './config/config'
@Module({
  imports:[
    ConfigModule.forRoot({ //load env with configModule
      isGlobal:true,
      cache:true,
      load:[config],
      envFilePath: '.env',

    }),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory:async(configService: ConfigService)=> //A custom function that returns the config for the module
      ({ secret :configService.get('jwt.secret'),

      }),
      global:true, 
    inject:[ConfigService]
    }),
MongooseModule.forRootAsync({
  imports:[ConfigModule],
  useFactory: async(configService: ConfigService) => {
 const uri = configService.get<string>('mongo_uri');
  const uriAlt = configService.get<string>('database.connectionstring');
  console.log('mongo_uri:', uri);
  console.log('database.connectionstring:', uriAlt);

  const mongoUri = uri || uriAlt;
  if (!mongoUri) {
    throw new Error('MongoDB URI not found in config');
  }

  return { uri: mongoUri };
  },
inject:[ConfigService],
}),
AuthModule,
UserModule,
BugModule,
ProjectsModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
