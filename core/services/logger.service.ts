export class LoggerService {

    protected static instance: LoggerService;
    protected debug: boolean;
    protected colors: any = {
        "reset": "\x1b[0m",
        "black": "\x1b[30m",
        "red": "\x1b[31m",
        "green": "\x1b[32m",
        "yellow": "\x1b[33m",
        "blue": "\x1b[34m",
        "magenta": "\x1b[35m",
        "cyan": "\x1b[36m",
        "white": "\x1b[37m"
    };
    /**
     *
     * @type {[string,string,string,string,string,string,string]}
     */
    protected presets: any = [
        "-------------",
        "INVOKED",
        "ADDED",
        "REMOVED",
        "CHANGED",
        "VARIABLE%e: ",
        "SET VAR%e: "
    ];

    protected constructor() {}

    /**
     *
     * @returns {LoggerService}
     */
    public static getInstance(): LoggerService {
        return this.instance ? this.instance : this.instance = new LoggerService();
    }

    /**
     *
     * @param debug
     */
    public setDebug(debug: boolean):void {
        this.debug = debug;
        console.log("SET DEBUG: ", this.debug);
    }

    /**
     *
     * @param config
     * @param args
     */
    public log(config: any, ...args: Array<any>): void {
        if(!this.debug) return;

        let method: string,
            preset: string,
            color: number,
            strs: Array<any>,
            str: string = "";
        switch(typeof config){
            case "string":
                method = config;
                break;
            case "object":
                method = config.method || "log";
                preset = this.presets[config.preset];
                color = this.colors[config.color];
                break;
            case "number":
                method = "log";
                preset = this.presets[config];
                break;
        }
        if(typeof args[0] == "object" && typeof args[0].str == "string" && typeof args[0].args == "object") {
            strs = args[0].args;
            str = args[0].str;
        } else {
            strs = args;
        }
        if (typeof preset != "undefined") {
            strs.unshift(preset.replace("%e", str));
        }
        if (typeof color != "undefined") {
            strs.unshift(color);
        }
        console[method](...strs);
    }
}