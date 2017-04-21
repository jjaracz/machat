import express from "express";
import bodyParser from "body-parser";
import path from "path";

import { LoggerService } from "./services";

let configDefault = {
    port: 3000,
    host: "127.0.0.1",
    statics: "public",
    routes: "app/routes.json",
    debug: true
};

export class Core {

    protected app: express.Application;
    protected log: LoggerService;
    protected logger: LoggerService;
    protected config: any;

    constructor(app: express.Application, config: Object = {}) {
        this.app = app;
        this.logger = LoggerService.getInstance();
        this.logger.log(1, this.constructor.name);
        this.config = Object.assign(config, configDefault);
        this.app.get("/", (req, res) => {
            res.send("<h1>WORKS!!</h1>");
        })
    }

    protected setApp(){
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, this.config.server.public)))
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    }

}