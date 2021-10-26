import { getCustomRepository, Repository } from "typeorm"
import { Permission } from "../entities/Permission"
import { Role } from "../entities/Role"
import { PermissionRepository, RoleRepository } from "../repositories"


type RolePermissionRequest = {
  role_id: string;
  permissions: string[];
}

export class RolePermissionService {

  private role_repository: Repository<Role>
  private permission_repository: Repository<Permission>

  constructor() {
    this.role_repository = getCustomRepository(RoleRepository);
    this.permission_repository = getCustomRepository(PermissionRepository);
  }

  async execute({ role_id, permissions }: RolePermissionRequest): Promise<Role | Error> {

    const role = await this.role_repository.findOne(role_id);

    if (!role)
      return new Error('Role does not exists');

    const permissions_exists = await this.permission_repository.findByIds(permissions);

    role.permissions = permissions_exists;

    await this.role_repository.save(role);

    return role;
  }
}