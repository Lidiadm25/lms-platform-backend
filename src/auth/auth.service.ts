import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { UserProject } from 'src/user-projects/entities/user-project.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ValidRoles } from './interfaces/validRoles';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      if ((await this.userRepository.countBy({ email: userData.email })) > 0) {
        throw new BadRequestException(`User already exists with that email`);
      }

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);

      return {
        user: { ...user },
        token: this.getJtwToken({ id: user.id }),
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async changeRole(user: User) {
    const userUpdated = this.userRepository.create({
      ...user,
      roles: [ValidRoles.admin],
    });

    return this.userRepository.save(userUpdated);
  }

  private getJtwToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { id: true, password: true, email: true, roles: true },
    });

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    return {
      user: { ...user },
      token: this.getJtwToken({ id: user.id }),
    };
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('Please check server logs');
  }

  async checkAuthStatus(user: User) {
    return {
      user: user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findAllFilteredByEmail(
    query: string,
    pagination: number,
    projectId: string,
  ) {
    query = '%' + query + '%';
    // todos los users
    /* const [users, total]= await this.userRepository.createQueryBuilder("users") 
    .where("email like :query", {query})
    .getManyAndCount()
    */
    // Usuarios inscritos en proyectos

    const usersNotIn = await this.userRepository
      .createQueryBuilder('users')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('up.userId')
          .from(UserProject, 'up')
          .where('up.projectId = :projectId')
          .getQuery();

        return 'users.id NOT IN ' + subQuery;
      })
      .setParameter('projectId', projectId)
      .getMany();

    if (!usersNotIn) {
      throw new NotFoundException(`User not found`);
    }

    return usersNotIn;
    //pages: Math.ceil( total/ pagination),
  }
}
