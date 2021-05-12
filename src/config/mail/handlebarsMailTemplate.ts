import handlebars from 'handlebars';

// INTERFACES
import ParserMailTemplate from '../../interfaces/parserMailTemplate';

class HandleBarsMailTemplate {
	public async parser({
		template,
		variables,
	}: ParserMailTemplate): Promise<string> {
		const parseTemplate = handlebars.compile(template);

		return parseTemplate(variables);
	}
}

const handleBarsMailTemplate = new HandleBarsMailTemplate();

export default handleBarsMailTemplate;
