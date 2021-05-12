import TemplateVariable from './templateVariable';

export default interface ParserMailTemplate {
	template: string;
	variables: TemplateVariable;
}
