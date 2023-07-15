import * as core from '@actions/core'
import { spawn } from 'child_process';

const shellAsync = (cmd: string) => {
	return new Promise((resolve: any) => {
		const script = spawn(cmd);

		script.stdout.on('data', (data) => {
			core.info(`${data}`);
		});

		script.stderr.on('data', (data) => {
			core.info(`${data}`);
		});

		script.on('close', (code) => {
			core.info(`child process exited with code ${code}`);
			resolve();
		});
	});
};

async function run(): Promise<void> {
  try {
		const tags: string = core.getInput('tags');
		await shellAsync('pip install docker-squash');
		await shellAsync('docker load --input /tmp/myimage.tar');
		core.info('Determining the path of docker-squash');
		core.info(`which docker-squash`);
		await Promise.all(tags.split('\n').map(async tag => {
			await shellAsync(`docker-squash -t ${tag}-squashed ${tag}`);
			await shellAsync(`docker push ${tag}-squashed`);
		}));
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
