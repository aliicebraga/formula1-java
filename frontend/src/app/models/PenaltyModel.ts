import { Team } from 'src/app/models/teamModel';
export interface Penalty {
  code?: string
  peDescription: string
  peDueDate: any
  peValue: any
  peStatus: string
  team: Team
}
