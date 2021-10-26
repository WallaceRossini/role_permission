import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User"
import { UserRepository } from "../repositories"

type UserRequest = {
  username: string;
  password: string;
}

export class SessionService {

  private user_repository: Repository<User>

  constructor() {
    this.user_repository = getCustomRepository(UserRepository)
  }

  async execute({ username, password }: UserRequest) {

    const user = await this.user_repository.findOne({ username });

    if (!user)
      return new Error('User does not exists');

    const password_match = await compare(password, user.password);

    if (!password_match)
      return new Error('User or Password incorrect');

    const token = sign({}, process.env.SECRET_JWT, {
      subject: user.id
    })

    return { token };
  }
}