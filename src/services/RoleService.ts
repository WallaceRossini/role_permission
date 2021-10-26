import { getCustomRepository, Repository } from "typeorm";
import { Role } from "../entities/Role";
import { RoleRepository } from "../repositories";


type RoleRequest = {
  name: string;
  description: string;
}

export class RoleService {

  private role_repository: Repository<Role>;

  constructor() {
    this.role_repository = getCustomRepository(RoleRepository)
  }

  async execute({ name, description }: RoleRequest): Promise<Role | Error> {

    if (await this.role_repository.findOne({ name }))
      return new Error('Role already exists');

    const role = this.role_repository.create({ name, description });

    await this.role_repository.save(role);

    return role;
  }
}