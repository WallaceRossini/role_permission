import { hash } from "bcryptjs";
import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories"

type UserRequest = {
  username: string;
  password: string;
}

export class UserService {

  private user_repository: Repository<User>

  constructor() {
    this.user_repository = getCustomRepository(UserRepository)
  }

  async execute({ username, password }: UserRequest) {

    const exist_user = await this.user_repository.findOne({ username });

    if (exist_user)
      return new Error('User alrealy exists');

    const password_hash = await hash(password, 10);

    const user = this.user_repository.create({ username, password: password_hash });

    await this.user_repository.save(user)

    return user
  }
}