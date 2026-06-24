import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './mail.service';

@Module({
  imports: [ConfigModule], // EmailService needs ConfigService
  providers: [EmailService],
  exports: [EmailService], // Export for other modules
})
export class EmailModule {}