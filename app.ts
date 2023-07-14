// import dotenv from "dotenv";
// dotenv.config();
// import express, { Request, Response } from "express";
// import catchAll from "./utils/CatchAll";
// import usersController from "./controllers/usersController"
// import studentsController from "./controllers/studentsController"
// import activitiesController from "./controllers/activitiesController"
// import groupsController from "./controllers/groupsController"
// import plansController from "./controllers/plansController"

// import cors from "cors"
// import dl from "./utils/dl";
// import verifyLoggedIn from "./utils/verify-logged-in";
// import { auth } from "firebase-admin";
// dl.connect();




// const server = express();

// server.use(cors());

// server.use(express.json());
// // server.use("/api", auth);
// server.use(verifyLoggedIn)
// server.use("/api", usersController);
// server.use("/api", studentsController);
// server.use("/api", activitiesController);
// server.use("/api", groupsController);
// server.use("/api", plansController);

// server.get("/", function (req: Request, response: Response) {
//     response.send("API 1.0.0");
// });

// server.use(catchAll);

// server.listen("4001", () => console.log("Listening to http://localhost:4001"));

// import dotenv from "dotenv";
// dotenv.config();
// import express, { Request, Response } from "express";
// import catchAll from "./utils/CatchAll";
// import usersController from "./controllers/usersController"
// import studentsController from "./controllers/studentsController"
// import activitiesController from "./controllers/activitiesController"
// import groupsController from "./controllers/groupsController"
// import plansController from "./controllers/plansController"

// import cors from "cors"
// import dl from "./utils/dl";
// import verifyLoggedIn from "./utils/verify-logged-in";
// import { auth } from "firebase-admin";
// dl.connect();

// const server = express();

// server.use(cors());
// server.use(express.json());

// // Middleware to verify logged-in users
// server.use(verifyLoggedIn);

// // Regular user routes
// server.use("/api", usersController);
// server.use("/api", groupsController);
// server.use("/api", plansController);

// // Admin-only routes
// server.use("/api", isAdmin, studentsController);
// server.use("/api", isAdmin, activitiesController);

// // User routes
// server.use("/api", isUser, additionalUserController);

// server.get("/", function (req: Request, response: Response) {
//     response.send("API 1.0.0");
// });

// server.use(catchAll);

// server.listen("4001", () => console.log("Listening to http://localhost:4001"));

// // Middleware to check if the user is an admin
// function isAdmin(req: Request, res: Response, next: any) {
//     // Check if the user role is admin
//     const userRole = req.user.role;
//     if (userRole === "ADMIN") {
//         next(); // Allow access to the next middleware or route handler
//     } else {
//         res.status(403).json({ message: "Forbidden" }); // Return a Forbidden response if the user is not an admin
//     }
// }

// // Middleware to check if the user is a regular user
// function isUser(req: Request, res: Response, next: any) {
//     // Check if the user role is user
//     const userRole = req.user.role;
//     if (userRole === "USER") {
//         next(); // Allow access to the next middleware or route handler
//     } else {
//         res.status(403).json({ message: "Forbidden" }); // Return a Forbidden response if the user is not a regular user
//     }
// }

import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import blockNonLoggedIn from "./utils/blockNonLoggedIn";
import catchAll from "./utils/CatchAll";
import usersController from "./controllers/usersController";
import studentsController from "./controllers/studentsController";
import activitiesController from "./controllers/activitiesController";
import groupsController from "./controllers/groupsController";
import plansController from "./controllers/plansController";
import authController from "./controllers/authController";

import cors from "cors";
import dl from "./utils/dl";

dl.connect();

const server = express();

server.use(cors());
server.use(express.json());

// Regular user routes
//server.use("/api", blockNonLoggedIn, plansController);
server.use("/api", authController);
server.use(blockNonLoggedIn)
server.use("/api", plansController);
server.use("/api", studentsController);
server.use("/api", activitiesController);

// Admin-only routes
server.use("/api",  usersController);
server.use("/api", groupsController);



server.get("/", function (req: Request, response: Response) {
  response.send("API 1.0.0");
});

server.use(catchAll);

server.listen("4001", () => console.log("Listening to http://localhost:4001"));

