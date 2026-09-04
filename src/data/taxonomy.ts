/**
 * Evidence taxonomy, lab categories, technology tags and target roles.
 *
 * These keys are enforced by the content schemas in `src/content.config.ts`, which keeps
 * filter values consistent across the lab library, search index and structured data.
 * To add a technology or role, add it here first, then use the key in frontmatter.
 */

export const evidenceTypes = {
  'focused-lab': {
    label: 'Focused lab',
    description: 'A bounded technical task completed in a lab environment.',
  },
  'validated-lab': {
    label: 'Validated lab',
    description: 'A completed lab implementation with explicit tests and recorded evidence.',
  },
  'integrated-case-study': {
    label: 'Integrated case study',
    description:
      'A multi-component scenario designed and documented as an end-to-end environment or operational change, including decisions, testing, troubleshooting and rollback.',
  },
  'external-organisation-project': {
    label: 'External organisation project',
    description:
      'Authorised work delivered in a genuine organisational environment, published with permission.',
  },
} as const;

export type EvidenceType = keyof typeof evidenceTypes;
export const evidenceTypeKeys = Object.keys(evidenceTypes) as EvidenceType[];

export const categories = {
  'endpoint-management': {
    label: 'Endpoint Management',
    description:
      'Device provisioning, configuration, compliance, application deployment and update management.',
  },
  'identity-and-access': {
    label: 'Identity and Access',
    description:
      'Entra ID, authentication, Conditional Access, privileged access and identity governance.',
  },
  'microsoft-365': {
    label: 'Microsoft 365',
    description: 'Tenant administration, workloads and service configuration across Microsoft 365.',
  },
  security: {
    label: 'Security',
    description:
      'Defender, hardening baselines, encryption, attack surface reduction and monitoring.',
  },
  'azure-and-cloud-infrastructure': {
    label: 'Azure and Cloud Infrastructure',
    description:
      'Azure resource organisation, networking, compute, storage, policy, backup and cost control.',
  },
  'windows-server-and-hybrid-infrastructure': {
    label: 'Windows Server and Hybrid Infrastructure',
    description:
      'AD DS, DNS, DHCP, Group Policy, virtualisation, hybrid identity and server operations.',
  },
  'automation-and-infrastructure-as-code': {
    label: 'Automation and Infrastructure as Code',
    description: 'PowerShell, Microsoft Graph, Terraform, remediation and reporting automation.',
  },
  'vdi-and-avd': {
    label: 'VDI/AVD',
    description: 'Virtual desktop infrastructure and Azure Virtual Desktop scenarios.',
  },
  'linux-and-containers': {
    label: 'Linux and Containers',
    description: 'Linux administration and container workloads.',
  },
} as const;

export type CategoryKey = keyof typeof categories;
export const categoryKeys = Object.keys(categories) as CategoryKey[];

export const technologies = {
  intune: 'Intune',
  autopilot: 'Windows Autopilot',
  'entra-id': 'Entra ID',
  'entra-connect': 'Entra Connect',
  'conditional-access': 'Conditional Access',
  pim: 'Privileged Identity Management',
  defender: 'Microsoft Defender',
  bitlocker: 'BitLocker',
  asr: 'Attack Surface Reduction',
  'windows-update-for-business': 'Windows Update for Business',
  'compliance-policies': 'Compliance policies',
  'configuration-profiles': 'Configuration profiles',
  'win32-apps': 'Win32 app deployment',
  'intune-remediations': 'Intune remediations',
  mam: 'App protection (MAM)',
  'android-enterprise': 'Android Enterprise',
  ios: 'iOS',
  'windows-11': 'Windows 11',
  'microsoft-365': 'Microsoft 365',
  'exchange-online': 'Exchange Online',
  'sharepoint-online': 'SharePoint Online',
  teams: 'Microsoft Teams',
  powershell: 'PowerShell',
  'microsoft-graph': 'Microsoft Graph',
  azure: 'Azure',
  'azure-policy': 'Azure Policy',
  rbac: 'Azure RBAC',
  'azure-networking': 'Azure networking',
  'azure-storage': 'Azure Storage',
  'azure-monitor': 'Azure Monitor',
  'azure-backup': 'Azure Backup',
  'azure-arc': 'Azure Arc',
  'azure-virtual-desktop': 'Azure Virtual Desktop',
  'windows-server': 'Windows Server',
  'ad-ds': 'AD DS',
  dns: 'DNS',
  dhcp: 'DHCP',
  'group-policy': 'Group Policy',
  'hyper-v': 'Hyper-V',
  vmware: 'VMware',
  citrix: 'Citrix',
  terraform: 'Terraform',
  bicep: 'Bicep',
  git: 'Git',
  'github-actions': 'GitHub Actions',
  linux: 'Linux',
  containers: 'Containers',
} as const;

export type TechnologyKey = keyof typeof technologies;
export const technologyKeys = Object.keys(technologies) as TechnologyKey[];

export const targetRoles = {
  'endpoint-administrator': 'Endpoint Administrator',
  'microsoft-365-administrator': 'Microsoft 365 Administrator',
  'identity-and-access-administrator': 'Identity and Access Administrator',
  'azure-administrator': 'Azure Administrator',
  'infrastructure-engineer': 'Infrastructure Engineer',
  'automation-engineer': 'Automation Engineer',
  'vdi-engineer': 'VDI/AVD Engineer',
  'third-line-support': '3rd Line Infrastructure Support',
} as const;

export type TargetRoleKey = keyof typeof targetRoles;
export const targetRoleKeys = Object.keys(targetRoles) as TargetRoleKey[];

export const credentialStatuses = {
  'earned-current': { label: 'Earned · current', short: 'Earned' },
  'earned-expired': { label: 'Earned · expired', short: 'Expired' },
  historical: { label: 'Earned · historical', short: 'Historical' },
  'in-progress': { label: 'In progress — not yet earned', short: 'In progress' },
} as const;

export type CredentialStatus = keyof typeof credentialStatuses;
export const credentialStatusKeys = Object.keys(credentialStatuses) as CredentialStatus[];

export const credentialTypes = {
  certification: 'Certification',
  'applied-skill': 'Microsoft Applied Skill',
  'historical-certification': 'Historical certification',
  'exam-in-progress': 'Exam in progress',
} as const;

export type CredentialType = keyof typeof credentialTypes;
export const credentialTypeKeys = Object.keys(credentialTypes) as CredentialType[];

export const relationshipTypes = {
  client: 'Client engagement',
  'volunteer-engagement': 'Volunteer engagement',
  'charity-project': 'Charity project',
  other: 'Organisation project',
} as const;

export type RelationshipType = keyof typeof relationshipTypes;
export const relationshipTypeKeys = Object.keys(relationshipTypes) as RelationshipType[];

export function evidenceTypeLabel(key: EvidenceType): string {
  return evidenceTypes[key].label;
}

export function categoryLabel(key: CategoryKey): string {
  return categories[key].label;
}

export function technologyLabel(key: TechnologyKey): string {
  return technologies[key];
}

export function targetRoleLabel(key: TargetRoleKey): string {
  return targetRoles[key];
}
