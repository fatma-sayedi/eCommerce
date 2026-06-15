import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from 'mail/mail.module';
import { AccessTokenStrategy } from './strategy/accessToken.strategy';

@Module({
  imports:[UserModule,ConfigModule.forRoot({isGlobal:true}),JwtModule.register({}), EmailModule],
  controllers: [AuthController],
  providers: [AuthService,AccessTokenStrategy],
})
export class AuthModule {}
