import { Container } from "inversify";
import { UserController } from "./controllers/user-controller";
import { UserUseCase } from "./usecases/user-usecase";
import { connectToDatabase, disconnectFromDatabase } from "./config/db-connection";
import { UserAdapter } from "./adapters/database/mongoDB/user-adapter";
import { UserInterface } from "./interfaces/user-interface";

// Establish database connection
connectToDatabase().catch(error => {
  console.error("Database connection failed:", error);
  process.exit(1);
});

// Create InversifyJS container
const container = new Container();

// Bindings
container.bind<UserInterface>("UserInterface").to(UserAdapter); // Bind UserInterface to UserAdapter implementation
container.bind<UserController>(UserController).toSelf(); // Bind UserController to itself
container.bind<UserUseCase>(UserUseCase).toSelf(); // Bind UserUseCase to itself

// Gracefully disconnect from database on process termination
process.on("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

export default container;
