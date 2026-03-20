import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../interfaces/validRoles';
export const META_ROLES = 'roles';

/**
 * Constant used for protection of the values of roles
 * 
 * @param args Enum of valid roles for entity Users
 * @returns Metadata of valid roles
 */
export const RoleProtected = (...args: ValidRoles[]) => {
    return SetMetadata(META_ROLES, args);
}
