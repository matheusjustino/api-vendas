import MailContact from './mailContact';
import ParserMailTemplate from './parserMailTemplate';

export default interface SendEmail {
	from?: MailContact;
	to: MailContact;
	subject: string;
	templateData: ParserMailTemplate;
}
