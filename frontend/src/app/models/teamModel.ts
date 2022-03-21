import { Employee } from 'src/app/models/employeeModel';
import { TeamLeader } from 'src/app/models/teamLeaderModel';
export interface Team {
  idTeam?: string
  teamName: string
  teamDateOfCreation: any
  teamDateOfEntry: any
  teamEngineSuplier: string
  // teamSponsors: string
  teamLogo: any
  teamActive: boolean
  employee?: Employee[]
  teamLeader?: TeamLeader
}
