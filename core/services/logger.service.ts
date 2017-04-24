export class LoggerService {

    private static instance: LoggerService;
    private static debug: boolean;
    private static colors: any = {
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
    private static presets: any = [
        "-------------",
        "INVOKED",
        "ADDED",
        "REMOVED",
        "CHANGED",
        "VARIABLE%e: ",
        "SET VAR%e: "
    ];

    /**
     *
     * @param debug
     */
    public static setDebug(debug: boolean):void {
        this.debug = debug;
        console.log("SET DEBUG: ", this.debug);
    }

    public static getDebug(): boolean{
        return this.debug;
    }

    /**
     *
     * @param config
     * @param args
     */
    public static log(config: any, ...args: Array<any>): void {
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
            strs.push(this.colors.reset);
        }
        console[method](...strs);
    }

    public static green(...args: Array<any>){
        if(!this.debug) return;
        args[0] = this.colors.green + args[0];
        args[args.length-1] = args[args.length-1] + this.colors.reset;
        console.log.apply(console, args);
    }

    public static yellow(...args){
        if(!this.debug) return;
        args[0] = this.colors.yellow + args[0];
        args[args.length-1] = args[args.length-1] + this.colors.reset;
        console.log.apply(console, args);
    }

    public static blue(...args){
        if(!this.debug) return;
        args[0] = this.colors.blue + args[0];
        args[args.length-1] = args[args.length-1] + this.colors.reset;
        console.log.apply(console, args);
    }

    public static magenta(...args){
        if(!this.debug) return;
        args[0] = this.colors.magenta + args[0];
        args[args.length-1] = args[args.length-1] + this.colors.reset;
        console.log.apply(console, args);
    }

    public static red(...args){
        if(!this.debug) return;
        args[0] = this.colors.red + args[0];
        args[args.length-1] = args[args.length-1] + this.colors.reset;
        console.log.apply(console, args);
    }

    public static cyan(...args){
        if(!this.debug) return;
        args[0] = this.colors.cyan + args[0];
        args[args.length-1] = args[args.length-1] + this.colors.reset;
        console.log.apply(console, args);
    }
}