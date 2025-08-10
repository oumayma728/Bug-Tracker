import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/role.decorator'; // adjust path
import { AuthGuard } from '../auth/auth.guard'; // adjust path
import { Role } from '../auth/role.enum';

@Controller('projects')
export class ProjectsController {

  @Get('admin-only')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  getAdminProjects() {
    return 'Only Admin can see this';
  }

  @Get('dev-or-admin')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin,Role.Developer)
  getDevProjects() {
    return 'Admins and Developers can see this';
  }
}
