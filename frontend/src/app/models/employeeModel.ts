import { Role } from 'src/app/models/roleModel';
export interface Employee {
  idEmployee?: String
  empName: string
  empBirth: any
  empContact: string
  empNationality: string
  role: Role
  empWage: any
  empPhoto: any
  empActive: boolean
  team: any
}
