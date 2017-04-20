import "reflect-metadata";
import { injectable } from 'inversify';

@injectable()
export default class LoggerService {

    protected static instance: LoggerService;
    protected debug: boolean;

    constructor() {}

    public static getInstance(): LoggerService {
        return this.instance ? this.instance : new LoggerService();
    }

    public setDebug(debug: boolean) {
        this.debug = debug;
        console.log("SET DEBUG: ", this.debug);
    }

    public log(method: string = "log", ...args) {
        console.log(this.debug);
        console[method](args);
    }
}