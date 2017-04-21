'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var bodyParser = _interopDefault(require('body-parser'));
var path = _interopDefault(require('path'));
var debug = _interopDefault(require('debug'));
var http = _interopDefault(require('http'));

class LoggerService {
    constructor() {
        this.colors = {
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
        this.presets = [
            "-------------",
            "INVOKED",
            "ADDED",
            "REMOVED",
            "CHANGED",
            "VARIABLE%e: ",
            "SET VAR%e: "
        ];
    }
    /**
     *
     * @returns {LoggerService}
     */
    static getInstance() {
        return this.instance ? this.instance : this.instance = new LoggerService();
    }
    /**
     *
     * @param debug
     */
    setDebug(debug$$1) {
        this.debug = debug$$1;
        console.log("SET DEBUG: ", this.debug);
    }
    /**
     *
     * @param config
     * @param args
     */
    log(config, ...args) {
        if (!this.debug)
            return;
        let method, preset, color, strs, str = "";
        switch (typeof config) {
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
        if (typeof args[0] == "object" && typeof args[0].str == "string" && typeof args[0].args == "object") {
            strs = args[0].args;
            str = args[0].str;
        }
        else {
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
//# sourceMappingURL=logger.service.js.map

//# sourceMappingURL=index.js.map

let configDefault = {
    port: 3000,
    host: "127.0.0.1",
    statics: "public",
    routes: "app/routes.json",
    debug: true
};
class Core {
    constructor(app, config = {}) {
        this.app = app;
        this.logger = LoggerService.getInstance();
        this.logger.log(1, this.constructor.name);
        this.config = Object.assign(config, configDefault);
        this.app.get("/", (req, res) => {
            res.send("<h1>WORKS!!</h1>");
        });
    }
    setApp() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, this.config.server.public)));
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    }
}

class Main {
    static bootstrap() {
        return new Main();
    }
    constructor() {
        this.app = express();
        let config = require("../config/config." + "dev" + ".json");
        this.setLogs(config.debug);
        new Core(this.app, config);
    }
    setLogs(debug$$1) {
        let log = LoggerService.getInstance();
        log.setDebug(true);
    }
}
//# sourceMappingURL=main.js.map

class App {
    constructor() {
        //get port from environment and store in Express.
        this.app = Main.bootstrap().app;
        this.port = this.normalizePort(process.env.PORT || 8080);
        this.app.set("port", this.port);
        this.server = http.createServer(this.app);
        this.server.listen(this.port);
        this.server.on("error", this.onError);
        // this.server.on("listening", this.onListening);
    }
    /**
     * Normalize a port into a number, string, or false.
     */
    normalizePort(val) {
        var port = parseInt(val, 10);
        if (isNaN(port)) {
            // named pipe
            return val;
        }
        if (port >= 0) {
            // port number
            return port;
        }
        return false;
    }
    /**
     * Event listener for HTTP server "error" event.
     */
    onError(error) {
        if (error.syscall !== "listen") {
            throw error;
        }
        var bind = typeof this.port === "string"
            ? "Pipe " + this.port
            : "Port " + this.port;
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                console.error(bind + " requires elevated privileges");
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(bind + " is already in use");
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
    /**
     * Event listener for HTTP server "listening" event.
     */
    onListening() {
        var addr = this.server.address();
        var bind = typeof addr === "string"
            ? "pipe " + addr
            : "port " + addr.port;
        debug("Listening on " + bind);
    }
}
new App();
//# sourceMappingURL=app.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLm1hcC5qcyIsInNvdXJjZXMiOlsiLi4vY29yZS9zZXJ2aWNlcy9sb2dnZXIuc2VydmljZS50cyIsIi4uL2NvcmUvY29yZS50cyIsIi4uL21haW4udHMiLCIuLi9hcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIExvZ2dlclNlcnZpY2Uge1xuXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogTG9nZ2VyU2VydmljZTtcbiAgICBwcm90ZWN0ZWQgZGVidWc6IGJvb2xlYW47XG4gICAgcHJvdGVjdGVkIGNvbG9yczogYW55ID0ge1xuICAgICAgICBcInJlc2V0XCI6IFwiXFx4MWJbMG1cIixcbiAgICAgICAgXCJibGFja1wiOiBcIlxceDFiWzMwbVwiLFxuICAgICAgICBcInJlZFwiOiBcIlxceDFiWzMxbVwiLFxuICAgICAgICBcImdyZWVuXCI6IFwiXFx4MWJbMzJtXCIsXG4gICAgICAgIFwieWVsbG93XCI6IFwiXFx4MWJbMzNtXCIsXG4gICAgICAgIFwiYmx1ZVwiOiBcIlxceDFiWzM0bVwiLFxuICAgICAgICBcIm1hZ2VudGFcIjogXCJcXHgxYlszNW1cIixcbiAgICAgICAgXCJjeWFuXCI6IFwiXFx4MWJbMzZtXCIsXG4gICAgICAgIFwid2hpdGVcIjogXCJcXHgxYlszN21cIlxuICAgIH07XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAdHlwZSB7W3N0cmluZyxzdHJpbmcsc3RyaW5nLHN0cmluZyxzdHJpbmcsc3RyaW5nLHN0cmluZ119XG4gICAgICovXG4gICAgcHJvdGVjdGVkIHByZXNldHM6IGFueSA9IFtcbiAgICAgICAgXCItLS0tLS0tLS0tLS0tXCIsXG4gICAgICAgIFwiSU5WT0tFRFwiLFxuICAgICAgICBcIkFEREVEXCIsXG4gICAgICAgIFwiUkVNT1ZFRFwiLFxuICAgICAgICBcIkNIQU5HRURcIixcbiAgICAgICAgXCJWQVJJQUJMRSVlOiBcIixcbiAgICAgICAgXCJTRVQgVkFSJWU6IFwiXG4gICAgXTtcblxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtMb2dnZXJTZXJ2aWNlfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTG9nZ2VyU2VydmljZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlID8gdGhpcy5pbnN0YW5jZSA6IHRoaXMuaW5zdGFuY2UgPSBuZXcgTG9nZ2VyU2VydmljZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGRlYnVnXG4gICAgICovXG4gICAgcHVibGljIHNldERlYnVnKGRlYnVnOiBib29sZWFuKTp2b2lkIHtcbiAgICAgICAgdGhpcy5kZWJ1ZyA9IGRlYnVnO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNFVCBERUJVRzogXCIsIHRoaXMuZGVidWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbmZpZ1xuICAgICAqIEBwYXJhbSBhcmdzXG4gICAgICovXG4gICAgcHVibGljIGxvZyhjb25maWc6IGFueSwgLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQge1xuICAgICAgICBpZighdGhpcy5kZWJ1ZykgcmV0dXJuO1xuXG4gICAgICAgIGxldCBtZXRob2Q6IHN0cmluZyxcbiAgICAgICAgICAgIHByZXNldDogc3RyaW5nLFxuICAgICAgICAgICAgY29sb3I6IG51bWJlcixcbiAgICAgICAgICAgIHN0cnM6IEFycmF5PGFueT4sXG4gICAgICAgICAgICBzdHI6IHN0cmluZyA9IFwiXCI7XG4gICAgICAgIHN3aXRjaCh0eXBlb2YgY29uZmlnKXtcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICAgICAgICBtZXRob2QgPSBjb25maWc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICAgICAgbWV0aG9kID0gY29uZmlnLm1ldGhvZCB8fCBcImxvZ1wiO1xuICAgICAgICAgICAgICAgIHByZXNldCA9IHRoaXMucHJlc2V0c1tjb25maWcucHJlc2V0XTtcbiAgICAgICAgICAgICAgICBjb2xvciA9IHRoaXMuY29sb3JzW2NvbmZpZy5jb2xvcl07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgICAgICAgICAgbWV0aG9kID0gXCJsb2dcIjtcbiAgICAgICAgICAgICAgICBwcmVzZXQgPSB0aGlzLnByZXNldHNbY29uZmlnXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZih0eXBlb2YgYXJnc1swXSA9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBhcmdzWzBdLnN0ciA9PSBcInN0cmluZ1wiICYmIHR5cGVvZiBhcmdzWzBdLmFyZ3MgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgc3RycyA9IGFyZ3NbMF0uYXJncztcbiAgICAgICAgICAgIHN0ciA9IGFyZ3NbMF0uc3RyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RycyA9IGFyZ3M7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBwcmVzZXQgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgc3Rycy51bnNoaWZ0KHByZXNldC5yZXBsYWNlKFwiJWVcIiwgc3RyKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBjb2xvciAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBzdHJzLnVuc2hpZnQoY29sb3IpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGVbbWV0aG9kXSguLi5zdHJzKTtcbiAgICB9XG59IiwiaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCBib2R5UGFyc2VyIGZyb20gXCJib2R5LXBhcnNlclwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuaW1wb3J0IHsgTG9nZ2VyU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzXCI7XG5cbmxldCBjb25maWdEZWZhdWx0ID0ge1xuICAgIHBvcnQ6IDMwMDAsXG4gICAgaG9zdDogXCIxMjcuMC4wLjFcIixcbiAgICBzdGF0aWNzOiBcInB1YmxpY1wiLFxuICAgIHJvdXRlczogXCJhcHAvcm91dGVzLmpzb25cIixcbiAgICBkZWJ1ZzogdHJ1ZVxufTtcblxuZXhwb3J0IGNsYXNzIENvcmUge1xuXG4gICAgcHJvdGVjdGVkIGFwcDogZXhwcmVzcy5BcHBsaWNhdGlvbjtcbiAgICBwcm90ZWN0ZWQgbG9nOiBMb2dnZXJTZXJ2aWNlO1xuICAgIHByb3RlY3RlZCBsb2dnZXI6IExvZ2dlclNlcnZpY2U7XG4gICAgcHJvdGVjdGVkIGNvbmZpZzogYW55O1xuXG4gICAgY29uc3RydWN0b3IoYXBwOiBleHByZXNzLkFwcGxpY2F0aW9uLCBjb25maWc6IE9iamVjdCA9IHt9KSB7XG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xuICAgICAgICB0aGlzLmxvZ2dlciA9IExvZ2dlclNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgdGhpcy5sb2dnZXIubG9nKDEsIHRoaXMuY29uc3RydWN0b3IubmFtZSk7XG4gICAgICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbihjb25maWcsIGNvbmZpZ0RlZmF1bHQpO1xuICAgICAgICB0aGlzLmFwcC5nZXQoXCIvXCIsIChyZXEsIHJlcykgPT4ge1xuICAgICAgICAgICAgcmVzLnNlbmQoXCI8aDE+V09SS1MhITwvaDE+XCIpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRBcHAoKXtcbiAgICAgICAgdGhpcy5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbiAgICAgICAgdGhpcy5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTtcbiAgICAgICAgdGhpcy5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsIHRoaXMuY29uZmlnLnNlcnZlci5wdWJsaWMpKSlcbiAgICAgICAgdGhpcy5hcHAudXNlKGZ1bmN0aW9uKGVycjogYW55LCByZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikge1xuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKFwiTm90IEZvdW5kXCIpO1xuICAgICAgICAgICAgZXJyLnN0YXR1cyA9IDQwNDtcbiAgICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59IiwiaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IENvcmUgfSBmcm9tIFwiLi9jb3JlL2NvcmVcIjtcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tIFwiLi9jb3JlL3NlcnZpY2VzXCI7XG5cbmV4cG9ydCBjbGFzcyBNYWluIHtcblxuICAgIHB1YmxpYyBhcHA6IGV4cHJlc3MuQXBwbGljYXRpb247XG5cbiAgICBwdWJsaWMgc3RhdGljIGJvb3RzdHJhcCgpOiBNYWluIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNYWluKCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYXBwID0gZXhwcmVzcygpO1xuXG4gICAgICAgIGxldCBjb25maWcgPSByZXF1aXJlKFwiLi4vY29uZmlnL2NvbmZpZy5cIiArIHByb2Nlc3MuZW52Lk5PREVfRU5WICsgXCIuanNvblwiKTtcbiAgICAgICAgdGhpcy5zZXRMb2dzKGNvbmZpZy5kZWJ1Zyk7XG4gICAgICAgIG5ldyBDb3JlKHRoaXMuYXBwLCBjb25maWcpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRMb2dzKGRlYnVnOiBib29sZWFuKXtcbiAgICAgICAgbGV0IGxvZyA9IExvZ2dlclNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgbG9nLnNldERlYnVnKHRydWUpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBNYWluIH0gZnJvbSBcIi4vbWFpblwiO1xuaW1wb3J0IGRlYnVnIGZyb20gXCJkZWJ1Z1wiO1xuaW1wb3J0IGh0dHAgZnJvbSBcImh0dHBcIjtcblxuY2xhc3MgQXBwIHtcblxuICAgIHByaXZhdGUgcG9ydDogYW55O1xuICAgIHByaXZhdGUgc2VydmVyOiBhbnk7XG4gICAgcHJpdmF0ZSBhcHA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIC8vZ2V0IHBvcnQgZnJvbSBlbnZpcm9ubWVudCBhbmQgc3RvcmUgaW4gRXhwcmVzcy5cbiAgICAgICAgdGhpcy5hcHAgPSBNYWluLmJvb3RzdHJhcCgpLmFwcDtcbiAgICAgICAgdGhpcy5wb3J0ID0gdGhpcy5ub3JtYWxpemVQb3J0KHByb2Nlc3MuZW52LlBPUlQgfHwgODA4MCk7XG4gICAgICAgIHRoaXMuYXBwLnNldChcInBvcnRcIiwgdGhpcy5wb3J0KTtcblxuICAgICAgICB0aGlzLnNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKHRoaXMuYXBwKTtcbiAgICAgICAgdGhpcy5zZXJ2ZXIubGlzdGVuKHRoaXMucG9ydCk7XG4gICAgICAgIHRoaXMuc2VydmVyLm9uKFwiZXJyb3JcIiwgdGhpcy5vbkVycm9yKTtcbiAgICAgICAgLy8gdGhpcy5zZXJ2ZXIub24oXCJsaXN0ZW5pbmdcIiwgdGhpcy5vbkxpc3RlbmluZyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBOb3JtYWxpemUgYSBwb3J0IGludG8gYSBudW1iZXIsIHN0cmluZywgb3IgZmFsc2UuXG4gICAgICovXG4gICAgcHJpdmF0ZSBub3JtYWxpemVQb3J0KHZhbCkge1xuICAgICAgICB2YXIgcG9ydCA9IHBhcnNlSW50KHZhbCwgMTApO1xuXG4gICAgICAgIGlmIChpc05hTihwb3J0KSkge1xuICAgICAgICAgICAgLy8gbmFtZWQgcGlwZVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3J0ID49IDApIHtcbiAgICAgICAgICAgIC8vIHBvcnQgbnVtYmVyXG4gICAgICAgICAgICByZXR1cm4gcG9ydDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBsaXN0ZW5lciBmb3IgSFRUUCBzZXJ2ZXIgXCJlcnJvclwiIGV2ZW50LlxuICAgICAqL1xuICAgIHByaXZhdGUgb25FcnJvcihlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3Iuc3lzY2FsbCAhPT0gXCJsaXN0ZW5cIikge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYmluZCA9IHR5cGVvZiB0aGlzLnBvcnQgPT09IFwic3RyaW5nXCJcbiAgICAgICAgICAgID8gXCJQaXBlIFwiICsgdGhpcy5wb3J0XG4gICAgICAgICAgICA6IFwiUG9ydCBcIiArIHRoaXMucG9ydDtcblxuICAgICAgICAvLyBoYW5kbGUgc3BlY2lmaWMgbGlzdGVuIGVycm9ycyB3aXRoIGZyaWVuZGx5IG1lc3NhZ2VzXG4gICAgICAgIHN3aXRjaCAoZXJyb3IuY29kZSkge1xuICAgICAgICAgICAgY2FzZSBcIkVBQ0NFU1wiOlxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYmluZCArIFwiIHJlcXVpcmVzIGVsZXZhdGVkIHByaXZpbGVnZXNcIik7XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkVBRERSSU5VU0VcIjpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGJpbmQgKyBcIiBpcyBhbHJlYWR5IGluIHVzZVwiKTtcbiAgICAgICAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXZlbnQgbGlzdGVuZXIgZm9yIEhUVFAgc2VydmVyIFwibGlzdGVuaW5nXCIgZXZlbnQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBvbkxpc3RlbmluZygpIHtcbiAgICAgICAgdmFyIGFkZHIgPSB0aGlzLnNlcnZlci5hZGRyZXNzKCk7XG4gICAgICAgIHZhciBiaW5kID0gdHlwZW9mIGFkZHIgPT09IFwic3RyaW5nXCJcbiAgICAgICAgICAgID8gXCJwaXBlIFwiICsgYWRkclxuICAgICAgICAgICAgOiBcInBvcnQgXCIgKyBhZGRyLnBvcnQ7XG4gICAgICAgIGRlYnVnKFwiTGlzdGVuaW5nIG9uIFwiICsgYmluZCk7XG4gICAgfVxuXG59XG5uZXcgQXBwKCk7Il0sIm5hbWVzIjpbImRlYnVnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQTZCSTtRQXpCVSxXQUFNLEdBQVE7WUFDcEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLFVBQVU7WUFDbkIsS0FBSyxFQUFFLFVBQVU7WUFDakIsT0FBTyxFQUFFLFVBQVU7WUFDbkIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsTUFBTSxFQUFFLFVBQVU7WUFDbEIsU0FBUyxFQUFFLFVBQVU7WUFDckIsTUFBTSxFQUFFLFVBQVU7WUFDbEIsT0FBTyxFQUFFLFVBQVU7U0FDdEIsQ0FBQzs7Ozs7UUFLUSxZQUFPLEdBQVE7WUFDckIsZUFBZTtZQUNmLFNBQVM7WUFDVCxPQUFPO1lBQ1AsU0FBUztZQUNULFNBQVM7WUFDVCxjQUFjO1lBQ2QsYUFBYTtTQUNoQixDQUFDO0tBRXdCOzs7OztJQU1uQixPQUFPLFdBQVc7UUFDckIsT0FBTyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO0tBQzlFOzs7OztJQU1NLFFBQVEsQ0FBQ0EsUUFBYztRQUMxQixJQUFJLENBQUMsS0FB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
