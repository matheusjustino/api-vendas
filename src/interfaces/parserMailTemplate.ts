import TemplateVariable from './templateVariable';

export default interface ParserMailTemplate {
	file: string;
	variables: TemplateVariable;
}
