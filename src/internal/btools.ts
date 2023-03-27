import * as gcp from '@pulumi/gcp';
import * as pulumi from '@pulumi/pulumi';
import * as github from '@pulumi/github';
import { billingAccount } from '../config';
import { ProjectOnGithub } from '../components/projects-on-github';
import { folder } from './folder';

export const githubProvider = new github.Provider(`btools-provider`, {
  owner: 'btoolsorg',
});

export const project = new gcp.organizations.Project(
  'btools',
  {
    autoCreateNetwork: true,
    billingAccount,
    name: 'btools',
    projectId: 'btools',
    folderId: folder.id,
  },
  { protect: true },
);

export const setup = new ProjectOnGithub(
  'btools-project',
  {
    project,
    repository: 'infra',
  },
  { providers: [githubProvider] },
);

export const googleProvider = new gcp.Provider(
  'btools-google-provider',
  {
    project: project.name,
  }
);

export const services = [
  'servicemanagement.googleapis.com',
  'servicecontrol.googleapis.com',
  'container.googleapis.com',
  'compute.googleapis.com',
  'dns.googleapis.com',
  'cloudresourcemanager.googleapis.com',
  'logging.googleapis.com',
  'stackdriver.googleapis.com',
  'monitoring.googleapis.com',
  'cloudtrace.googleapis.com',
  'clouderrorreporting.googleapis.com',
  'clouddebugger.googleapis.com',
  'cloudprofiler.googleapis.com',
  'sqladmin.googleapis.com',
  'cloudkms.googleapis.com',
  'cloudfunctions.googleapis.com',
  'iam.googleapis.com',
];

export const apiServices = services.map(
  (service) =>
    new gcp.projects.Service(
      `btools-${service}`,
      {
        disableOnDestroy: false,
        service,
      },
      { provider: googleProvider },
    ),
);
