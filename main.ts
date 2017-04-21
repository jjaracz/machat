import express from "express";
import { Core } from "./core/core";
import { LoggerService } from "./core/services";

export class Main {

    public app: express.Application;

    public static bootstrap(): Main {
        return new Main();
    }

    constructor() {
        this.app = express();

        let config = require("../config/config." + process.env.NODE_ENV + ".json");
        this.setLogs(config.debug);
        new Core(this.app, config);
    }

    protected setLogs(debug: boolean){
        let log = LoggerService.getInstance();
        log.setDebug(true);
    }
}