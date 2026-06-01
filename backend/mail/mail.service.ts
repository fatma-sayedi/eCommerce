import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    // Create a transporter using Ethereal test credentials.
    // For production, replace with your actual SMTP server details.
    private transporter;
    constructor(
        private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false, // Use true for port 465, false for port 587
            auth: {
                user: this.configService.get<string>('EMAIL_USER'),
                pass: this.configService.get<string>('PASS_USER'),
            },
        });
    }
    // Send an email using async/await
    async sendResetEmail(
        email: string,
        subject: string,
        htmlMessage: string,
    ): Promise<boolean> {
        try {
            await this.transporter.sendMail({
                from: this.configService.get<string>('EMAIL_USER'),
                to: email,
                subject: subject,
                html: htmlMessage,
            });
            console.log('Email sent successfully to :', email);
            return true;
        } catch (error) {
            console.error('Failure to sent Email', error);
            return false;
        }
    }
}