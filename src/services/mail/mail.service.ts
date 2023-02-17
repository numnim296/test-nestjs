import { MailDto } from './../../dto/mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    async sendMail(mailDto: MailDto): Promise<[isSend:boolean,error:any]> {
        let { to, from, subject, html } = mailDto
        console.log('send',to,from,subject,html)
        try {
            await this.mailerService.sendMail({
                to: to,
                from: from,
                subject: subject,
                html: html
            })
            console.log('send password to mail success')
            return [true,'']
        } catch (error) {
            return [false,error]
        }
    }
}
