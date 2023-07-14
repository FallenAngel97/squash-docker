import * as core from '@actions/core'
import { execSync } from 'child_process';

async function run(): Promise<void> {
  try {
		const tags: string = core.getInput('tags');
		core.info(tags);
		console.log(execSync('pip install docker-squash').toString());
		tags.split('/n').forEach(tag => {
			console.log(execSync(`docker-squash ${tag}`).toString());
			console.log(execSync(`docker push ${tag}`));
		});

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
