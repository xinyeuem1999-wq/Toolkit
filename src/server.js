import fs from "node:fs";
import path from "node:path";
import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

import createApp from "./app.js";

const ROOT = process.cwd();

const CONFIG_FILE = path.join(
    ROOT,
    "config",
    "config.json"
);

if (!fs.existsSync(CONFIG_FILE)) {

    console.error(
        "[FATAL] config/config.json not found."
    );

    process.exit(1);

}

const config = JSON.parse(

    fs.readFileSync(
        CONFIG_FILE,
        "utf8"
    )

);

const app = express();

app.disable("x-powered-by");

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(express.json({

    limit: "50mb"

}));

app.use(express.urlencoded({

    extended: true,
    limit: "50mb"

}));

app.use(

    morgan("dev")

);

createApp(

    app,
    config

);

const server = app.listen(

    config.server.port,

    config.server.host,

    () => {

        console.log("");

        console.log("===================================");

        console.log(" MCP AI Bridge");

        console.log("===================================");

        console.log("");

        console.log(
            "Host      :",
            config.server.host
        );

        console.log(
            "Port      :",
            config.server.port
        );

        console.log(
            "Workspace :",
            config.project.workspace.home
        );

        console.log(
            "Storage   :",
            config.project.workspace.storage
        );

        console.log(
            "MCP       :",
            config.mcp.url
        );

        console.log("");

        console.log("Bridge started.");

        console.log("");

    }

);

process.on(

    "SIGINT",

    () => {

        console.log("");

        console.log("Stopping bridge...");

        server.close(() => {

            console.log("Stopped.");

            process.exit(0);

        });

    }

);

process.on(

    "uncaughtException",

    err => {

        console.error(err);

    }

);

process.on(

    "unhandledRejection",

    err => {

        console.error(err);

    }

);
