import express from "express";
import Core from "./core/core";
import { inject } from "inversify";
import container from "./core/container";
import LoggerService from "./core/services/LoggerService";
import {LoggerInterface} from "./core/interfaces/LoggerInterface";

class Main {
    public app: express.Application;
    private _log: any;

    public static bootstrap(): Main {
        return new Main();
    }

    constructor() {
        this.app = express();
        this._log = container.get("LoggerService");
        this._log.setDebug(true);
        new Core(this.app, container);
    }
}

var server = Main.bootstrap();
export default server.app;