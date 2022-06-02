import {BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth-guards';
import { UserService } from './user.service';
import { UsersDto } from './userDto.ts';


@Controller('users')
export class UsersController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  

  @UseGuards(JwtAuthGuard)
  @Get('/')
  read(): string {
    return 'Read route working';
  }



  @Get('/readall')
  async reaAllUsers() {
    const users = await this.userService.readAll();
    if (users.length == 0) {
      throw new NotFoundException('User Not Found');
    }
    const user = users.map(({ password, ...rest }) => {
      return rest;
    });
    return this.success('User fetched successfully', user);
  }




  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req: any) {
    return this.authService.login(req.user);
  }




  @Post('/create')
  @UsePipes(ValidationPipe)
  async createUsers(@Body() data: UsersDto) {
    const findUser = await this.userService.readEmail(data.email);
    if (findUser) {
      throw new BadRequestException('User Exist Already');
    }
    const user = await this.userService.create(data);
    if (!user) {
      throw new NotFoundException('User Not Created');
    }
    const token = await this.authService.login(user);
    console.log(token);
    return this.success('User created successfully', token);
  }




  @Get('/read/:id')
  async readUser(@Param('id') id: number) {
    const data = await this.userService.read(id);
    if (!data) {
      throw new NotFoundException('User Not Found');
    }
    delete data.password;
    return this.success('User fetched successfully', data);
  }




  @UseGuards(JwtAuthGuard)
  @Put('/update/:id')
  async updateUser(@Param('id') id: number, @Body() data: Partial<UsersDto>) {
    const isUpdated = await this.userService.update(id, data);
    if (!isUpdated) {
      throw new BadRequestException('User doesnt exist, what are you trying to accomplish,   you cunt?');
    }
    const user = await this.userService.read(id);
    delete user.password;
    return this.success('User updated successfully', user);
  }




  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async deleteUser(@Param('id') id: number) {
    const user = this.userService.delete(id);
    if (!user) {
      throw new BadRequestException('User Not Deleted');
    }
    return this.success('User updated successfully', user);
  }

  success(message: string, data) {
    return {
      success: true,
      message: message,
      data: data,
    };
  }
  
}