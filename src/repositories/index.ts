import { EntityRepository, getCustomRepository, Repository } from "typeorm"
import { Permission } from "../entities/Permission"
import { Product } from "../entities/Product"
import { Role } from "../entities/Role"
import { User } from "../entities/User"

@EntityRepository(User)
export class UserRepository extends Repository<User> {
}
@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
}
@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {
}
@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
}