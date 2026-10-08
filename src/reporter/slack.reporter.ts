import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from '@playwright/test/reporter';

class SlackReporter implements Reporter {
  pass: number = 0;
  fail: number = 0;
  tests: string[] = [];

  onBegin(config: FullConfig, suite: Suite) {}

  onTestBegin(test: TestCase, result: TestResult) {
    this.tests.push(test.title);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'failed') {
      this.fail++;
    } else if (result.status === 'passed') {
      this.pass++;
    }
  }

  async onEnd(result: FullResult) {
    const msg = `Số test passed: ${this.pass}, số test failed: ${this.fail}`;
    console.log(`Danh sách các tests`);
    for (let i = 0; i < this.tests.length; i++) {
      console.log(`${i + 1}. ${this.tests[i]}`);
    }

    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn(
        'SlackReporter: SLACK_WEBHOOK_URL is not set; skipping Slack notification.',
      );
      return;
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: msg }),
    });

    if (!response.ok) {
      console.error(
        `WebhookReporter Failed: Server responded with status ${response.status}`,
      );
    }
  }
}

export default SlackReporter;
