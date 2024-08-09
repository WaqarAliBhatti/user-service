// Import necessary decorators and classes from NestJS modules.
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';  // Decorators for defining routes and handling HTTP requests.
import { UserService } from './user.service';  // Import the service that handles business logic related to users.
import { CreateUserDto } from './dto/create-user.dto';  // Import DTO for creating a user.
import { UpdateUserDto } from './dto/update-user.dto';  // Import DTO for updating a user.
import { MessagePattern } from '@nestjs/microservices';  // Decorator for handling microservice messages.

@Controller()  // Marks this class as a controller that handles incoming HTTP requests or microservice messages.
export class UserController {
  // The constructor injects the UserService into this controller.
  // This service is used to perform operations related to users.
  constructor(private readonly userService: UserService) { }

  // @Post() decorator defines a route that listens for POST requests at the root endpoint.
  // This method handles the creation of a new user.
  // It takes the 'CreateUserDto' object from the request body and passes it to the UserService to create a new user.
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);  // Call the create method of UserService to add a new user.
  }

  // @MessagePattern({ cmd: 'get_users' }) decorator defines a pattern for handling messages with the command 'get_users'.
  // This method will be called when a message with this command is received by the microservice.
  // It calls the UserService to retrieve the list of all users.
  @MessagePattern({ cmd: 'get_users' })
  findAll() {
    return this.userService.findAll();  // Call the findAll method of UserService to get all users.
  }

  // @Get(':id') decorator defines a route that listens for GET requests at the '/:id' endpoint.
  // It uses the ':id' parameter from the URL to fetch a specific user.
  // The 'findOne' method takes the 'id' from the URL, converts it to a number, and calls the UserService to find the user.
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);  // Call the findOne method of UserService with the user ID.
  }

  // @Patch(':id') decorator defines a route that listens for PATCH requests at the '/:id' endpoint.
  // It updates an existing user identified by the 'id' in the URL.
  // The 'update' method takes the 'id' and 'updateUserDto' from the request to update the user details.
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);  // Call the update method of UserService to modify a user.
  }

  // @Delete(':id') decorator defines a route that listens for DELETE requests at the '/:id' endpoint.
  // It deletes a user identified by the 'id' in the URL.
  // The 'remove' method takes the 'id' from the URL and calls the UserService to remove the user.
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);  // Call the remove method of UserService to delete a user.
  }
}
/*
Explanation:
@Controller() Decorator: Marks the class as a controller, responsible for handling incoming HTTP requests and microservice messages.

@Post() Decorator: Defines a route that listens for HTTP POST requests. This method is used to create a new user by calling the create method of the UserService.

@MessagePattern() Decorator: Used to handle messages in a microservice context. This method responds to messages with a specific command (get_users) and interacts with the UserService to retrieve user data.

@Get(':id') Decorator: Defines a route that listens for HTTP GET requests at the /id endpoint. The method retrieves a user based on the id parameter from the URL.

@Patch(':id') Decorator: Defines a route that listens for HTTP PATCH requests at the /id endpoint. The method updates a user identified by the id parameter with the data provided in the request body.

@Delete(':id') Decorator: Defines a route that listens for HTTP DELETE requests at the /id endpoint. The method deletes a user identified by the id parameter.

UserService: A service class that contains the business logic for handling user data. The UserController methods delegate the actual work to this service.

The UserController class manages both HTTP requests and microservice messages related to user operations. It interacts with the UserService to perform CRUD operations (Create, Read, Update, Delete) on user data.
*/