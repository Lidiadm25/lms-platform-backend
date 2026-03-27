import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { Auth } from './decorators/auth.decorator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    console.log('entrando a servicio');
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    console.log('entrando a servicio');
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get()
  get(){
    return this.authService.findAll();
  }

  @Get('email/:query')
  getEmails(@Param('query') query:string, @Query() pagination:PaginationDto){
    let limit:number = 2;
   if(pagination.limit) {
      limit = pagination!.limit;
   } 

    return this.authService.findAllFilteredByEmail(query, limit)
  }

}
