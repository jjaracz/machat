import { Core } from "./core/core";
import debug from "debug";
import http from "http";
import config from "./config/config.dev.json";



class App {

    private port: any;
    private server: any;
    private app: any;

    constructor(){
        //get port from environment and store in Express.
        this.app = new Core().bootstrap();
        this.port = this.normalizePort(config.port|| 8080);
        this.app.set("port", this.port);

        this.server = http.createServer(this.app);
        this.server.listen(this.port);
        this.server.on("error", this.onError);
        // this.server.on("listening", this.onListening);
    }


    /**
     * Normalize a port into a number, string, or false.
     */
    private normalizePort(val) {
        let port = parseInt(val, 10);

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
    private onError(error) {
        if (error.syscall !== "listen") {
            throw error;
        }

        let bind = typeof this.port === "string"
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
    private onListening() {
        let addr = this.server.address();
        let bind = typeof addr === "string"
            ? "pipe " + addr
            : "port " + addr.port;
        debug("Listening on " + bind);
    }

}
new App();