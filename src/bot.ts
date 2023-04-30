import * as github from '@pulumi/github';
import { pulumiAccessToken } from './config';
import { bjerkio } from './github-orgs';

new github.ActionsSecret(
  'bot-pulumi',
  {
    secretName: 'PULUMI_ACCESS_TOKEN',
    plaintextValue: pulumiAccessToken.apply(t => t || ''),
    repository: 'bot',
  },
  { provider: bjerkio },
);
