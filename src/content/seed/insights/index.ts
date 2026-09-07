import type { Insight } from '@/lib/content/types';
import { alteringAGlasgowTenement } from './altering-a-glasgow-tenement';
import { planningPermissionAndBuildingWarrant } from './planning-permission-and-building-warrant';
import { categoryBListedBuildings } from './category-b-listed-buildings';
import { repairingTraditionalGlasgowSandstone } from './repairing-traditional-glasgow-sandstone';
import { energyUpgradesInTraditionalBuildings } from './energy-upgrades-in-traditional-buildings';
import { ventilationWhenMakingAHomeMoreAirtight } from './ventilation-when-making-a-home-more-airtight';

export const insights: Insight[] = [
  alteringAGlasgowTenement,
  planningPermissionAndBuildingWarrant,
  categoryBListedBuildings,
  repairingTraditionalGlasgowSandstone,
  energyUpgradesInTraditionalBuildings,
  ventilationWhenMakingAHomeMoreAirtight,
];
