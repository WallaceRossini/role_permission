import { getCustomRepository, Repository } from "typeorm"
import { Permission } from "../entities/Permission"
import { Role } from "../entities/Role"
import { User } from "../entities/User"
import { PermissionRepository, RoleRepository, UserRepository } from "../repositories"

type UserACLRequest = {
  user_id: string;
  roles: string[];
  permissions: string[];
}

export class UserAccessControlListService {

  private user_repository: Repository<User>
  private role_repository: Repository<Role>
  private permission_repository: Repository<Permission>

  constructor() {
    this.user_repository = getCustomRepository(UserRepository)
    this.role_repository = getCustomRepository(RoleRepository)
    this.permission_repository = getCustomRepository(PermissionRepository)
  }

  async execute({ user_id, roles, permissions }: UserACLRequest): Promise<User | Error> {

    const user = await this.user_repository.findOne(user_id);

    if (!user)
      return new Error('User does not exists!');

    const permissions_exists = await this.permission_repository.findByIds(permissions);

    const roles_exists = await this.role_repository.findByIds(roles);

    user.permissions = permissions_exists;
    user.roles = roles_exists;

    this.user_repository.save(user);

    return user;

  }
}