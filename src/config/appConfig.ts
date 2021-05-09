import { join } from 'path';

const environments = ['develop', 'production'];
const config =
	process.env.NODE_ENV && environments.includes(process.env.NODE_ENV)
		? `${process.env.NODE_ENV}.env`
		: 'develop.env';

const configPath = join(process.cwd(), '/src/environments', config);

export const configOptions = {
	envFilePath: configPath,
};
