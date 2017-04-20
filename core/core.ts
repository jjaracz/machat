import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { inject } from "inversify";

import LoggerService from "./services/LoggerService";

let config = {
    port: 3000,
    host: "127.0.0.1",
    statics: "public",
    routes: "app/routes.json",
    debug: true
};

export default class Core {

    protected app: express.Application;
    protected log: LoggerService;
    @inject("LoggerService") private _log: LoggerService;

    constructor(app: express.Application, container: any, config: Object = {}) {
        this.app = app;
        this._log = container.get("LoggerService");
        this._log.log("log", "BOB", "BOB");
    }

    protected setApp(){
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use()
    }

}