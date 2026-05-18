import { UserProject } from '../entities/user-project.entity';

export interface userProjectResponse {
  count: number;
  pages: number;
  total: number;
  users: UserProject[];
}
