import nodemailer from 'nodemailer';
import HandleBarsMailTemplate from './handlebarsMailTemplate';

// INTERFACES
import SendEmail from '../../interfaces/sendEmail';

class EtherealMail {
	public static async sendEmail({
		from,
		to,
		subject,
		templateData,
	}: SendEmail) {
		const account = await nodemailer.createTestAccount();
		const transporter = nodemailer.createTransport({
			host: account.smtp.host,
			port: account.smtp.port,
			secure: account.smtp.secure,
			auth: {
				user: account.user,
				pass: account.pass,
			},
		});

		const message = await transporter.sendMail({
			from: {
				name: from?.name || 'Equipe API Vendas',
				address: from?.email || 'equipe@apivendas.com.br',
			},
			to: {
				name: to.name,
				address: to.email,
			},
			subject,
			html: await HandleBarsMailTemplate.parser(templateData),
		});

		console.log('Message sent: %s', message.messageId);
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
	}
}

export default EtherealMail;
