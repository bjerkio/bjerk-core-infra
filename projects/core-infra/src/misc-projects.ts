import * as gcp from '@pulumi/gcp';
import { billingAccount, organizationNumber } from './config';

new gcp.organizations.Project('veltno', {
  autoCreateNetwork: true,
  billingAccount,
  name: 'veltno',
  projectId: 'veltno',
  orgId: String(organizationNumber),
});

new gcp.organizations.Project('tomba-domains', {
  autoCreateNetwork: true,
  billingAccount,
  name: 'tomba-domains',
  projectId: 'tomba-domains',
  orgId: String(organizationNumber),
});
