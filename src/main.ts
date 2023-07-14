import * as core from '@actions/core'
import { execSync } from 'child_process';

async function run(): Promise<void> {
  try {
		const tags: string = core.getInput('tags');
		core.info(execSync('pip install docker-squash').toString());
		core.info(execSync('docker load --input /tmp/myimage.tar').toString());
		core.info('Determining the path of docker-squash');
		core.info(`which docker-squash`);
		tags.split('/n').forEach(tag => {
			core.info(`docker-squash ${tag}`);
			core.info(execSync(`docker-squash ${tag}`).toString());
			core.info(execSync(`docker push ${tag}`).toString());
		});

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
