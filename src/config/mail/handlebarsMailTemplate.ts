import fs from 'fs';
import handlebars from 'handlebars';

// INTERFACES
import ParserMailTemplate from '../../interfaces/parserMailTemplate';

class HandleBarsMailTemplate {
	public async parser({
		file,
		variables,
	}: ParserMailTemplate): Promise<string> {
		const templateFileContent = await fs.promises.readFile(file, {
			encoding: 'utf-8',
		});
		const parseTemplate = handlebars.compile(templateFileContent);

		return parseTemplate(variables);
	}
}

const handleBarsMailTemplate = new HandleBarsMailTemplate();

export default handleBarsMailTemplate;
