import { getCustomRepository, Repository } from "typeorm"
import { Permission } from "../entities/Permission"
import { PermissionRepository } from "../repositories"

type PermissionRequest = {
  name: string;
  description: string;
}

export class PermissionService {

  private permission_repository: Repository<Permission>

  constructor() {
    this.permission_repository = getCustomRepository(PermissionRepository);
  }

  async execute({ name, description }: PermissionRequest): Promise<Permission | Error> {

    if (await this.permission_repository.findOne({ name }))
      return new Error('Permission already exists');

    const permission = this.permission_repository.create({ name, description });

    await this.permission_repository.save(permission);

    return permission;
  }

}