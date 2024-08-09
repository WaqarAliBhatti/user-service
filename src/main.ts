// Import the necessary classes from NestJS core and microservices modules.
import { NestFactory } from '@nestjs/core';  // Provides a method to create a NestJS application or microservice.
import { AppModule } from './app.module';  // Import the main application module that configures the application.
import { MicroserviceOptions, Transport } from '@nestjs/microservices';  // Types and transport options for configuring microservices.

async function bootstrap() {
  // Create a microservice application using NestFactory.
  // 'AppModule' is the root module for the microservice, which sets up the application's configuration.
  // 'MicroserviceOptions' interface is used to specify the configuration for the microservice.
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,  // Specifies that the microservice will use the TCP protocol for communication.
    options: {
      host: 'localhost',  // The hostname where the microservice will be running. Here it's set to 'localhost' for local development.
      port: 3001,  // The port number on which the microservice will listen for incoming requests. Here it’s set to 3001.
    },
  });

  // Start the microservice and make it ready to receive and handle incoming messages.
  // 'listen()' is an asynchronous method that initializes the microservice and begins listening for messages on the specified host and port.
  await app.listen();
}

// Call the 'bootstrap' function to start the microservice application.
bootstrap();
/*
Explanation:
NestFactory: A utility class from NestJS used to create and initialize a NestJS application or microservice. The createMicroservice method sets up a microservice instance.

AppModule: The root module of the application. It configures the application by setting up controllers, services, and other providers.

MicroserviceOptions: A TypeScript interface that defines the options for configuring a microservice, including the transport protocol and additional options.

Transport.TCP: Specifies that the microservice will use the TCP (Transmission Control Protocol) for communication. TCP is a reliable and commonly used protocol for network communication.

app.listen(): This method starts the microservice and makes it active, so it can receive and handle messages. It's an asynchronous method, meaning it returns a promise that resolves when the microservice is fully up and running.

bootstrap() Function: The main entry point for starting the microservice. It creates an instance of the microservice, configures it to use TCP transport, and then starts it.

By calling the bootstrap function, you initialize and start the microservice application, allowing it to communicate with other services or clients over TCP on the specified port.
*/