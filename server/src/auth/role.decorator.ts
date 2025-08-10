// This creates a custom decorator '@Roles' that allows attaching

import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum'; // Make sure the path is correct

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
