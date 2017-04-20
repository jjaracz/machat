import { Container } from "inversify";
import LoggerService from "./services/LoggerService";

var container = new Container();
container.bind("LoggerService").to(LoggerService);

export default container;