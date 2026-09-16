import { WebClient } from '@slack/web-api';

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

export async function sendSlackMessage(channel: string, blocks: any[]) {
    return slack.chat.postMessage({ channel, blocks });
}