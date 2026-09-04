import type { CategoryKey } from './taxonomy';

/**
 * Capability-to-evidence map used on the home page.
 *
 * Each capability is answered only by published evidence in the mapped categories
 * (plus published automation repositories for the automation capability).
 * A capability card renders only when at least one published item supports it.
 */
export interface Capability {
  key: string;
  title: string;
  categories: CategoryKey[];
  includesAutomationRepositories?: boolean;
}

export const capabilities: Capability[] = [
  {
    key: 'endpoint-management',
    title: 'Endpoint management',
    categories: ['endpoint-management'],
  },
  {
    key: 'identity-and-microsoft-365',
    title: 'Identity and Microsoft 365',
    categories: ['identity-and-access', 'microsoft-365'],
  },
  {
    key: 'azure-and-hybrid-infrastructure',
    title: 'Azure and hybrid infrastructure',
    categories: ['azure-and-cloud-infrastructure', 'windows-server-and-hybrid-infrastructure'],
  },
  {
    key: 'automation-and-infrastructure-as-code',
    title: 'Automation and Infrastructure as Code',
    categories: ['automation-and-infrastructure-as-code'],
    includesAutomationRepositories: true,
  },
  {
    key: 'security-and-operational-resilience',
    title: 'Security and operational resilience',
    categories: ['security'],
  },
  {
    key: 'vdi-and-avd',
    title: 'VDI/AVD',
    categories: ['vdi-and-avd'],
  },
];
