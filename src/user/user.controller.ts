//contains crud operations

import { Controller, Delete, Get, Param, Post, Put, Body } from '@nestjs/common';
import { user_interface } from './user.interface';
import { UserService } from './user.service';
  
 @Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  
  //readall
  @Get()
    async showAllUsers() {
      const users = await this.userService.showAll();
      return {
        message: 'User fetched successfully',
        users,
      };
    }
  
  //create
  @Post()
    async createUsers(@Body() data: user_interface) {
      const user = this.userService.create(data);
      return {
        message: 'User created successfully',
        user,
      };
    }
  
  //read
  @Get(':id')
    async readUser(@Param('id') id: number) {
      const data = await this.userService.read(id);
      console.log(data);
      return {
        message: 'User fetched successfully',
        data,
      };
    }
  

  //update  
  @Put(':id')
    async uppdateUser(@Param('id') id: number, @Body() data: Partial<user_interface>) {
      await this.userService.update(id, data);
      return {
        message: 'User updated successfully',
      };
    }
  
  //delete
  @Delete(':id')
    async deleteUser(@Param('id') id: number) {
      this.userService.destroy(id);
      return {
        message: 'User deleted successfully',
      };
    }
  }

  //chanfe name