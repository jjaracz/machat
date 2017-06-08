import express from "express";
import bodyParser from "body-parser";
import path from "path";

import { LoggerService } from "./services";
import { LogParam, LogMethod, Log } from "./decorators";

let configDefault = {
    "port": 3000,
    "host": "127.0.0.1",
    "debug": true,
    "env": "dev",
    "server": {
        "statics": "public",
        "routes": "app/routes.json",
        "shared": "app/shared",
        "controllers": "app/controllers",
        "models": "app/models"
    }
}; 

@Log
export class Core {
    protected app: express.Application;
    protected log: LoggerService;
    @LogParam protected config: any;

    constructor() {
        LoggerService.setDebug(true);
        LoggerService.log(1, this.constructor.name);
    }

    @LogMethod
    public bootstrap(env: string = "dev"): express.Application{
        this.app = express();
        this.config = Object.assign(require("../config/config." + env + ".json"), configDefault);
        this.setApp();
        // this.setRoutes();
        // LoggerService.red("BOOOOOOO");
        return this.app;
    }

    private setApp(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, "..", this.config.server.statics)));
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
        this.app.get("/", (req, res) => {
            res.send("<h1>WORKS!!</h1>");
        })
    }
 
    private setRoutes(){
        const routes = require("../"+this.config.server.routes);
        for(let route in routes){
            this.app.get(route, (req, res) => {
                res.send(require("../"+this.config.server.controllers+"/"+(routes[route].name || "Main")+".ts")[(routes[route].action || "index")]());
            })
        }
    }

}