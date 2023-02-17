import { MailDto } from './../../dto/mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    async sendMail(mailDto: MailDto): Promise<[isSend:boolean,error:any]> {
        let { to, from, subject, html } = mailDto
        try {
            await this.mailerService.sendMail({
                to: to,
                from: from,
                subject: subject,
                html: html
            })
            return [true,'']
        } catch (error) {
            return [false,error]
        }
    }
}
