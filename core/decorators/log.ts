import { LoggerService } from "../services";
import "reflect-metadata";

const COLOR = "green";
const LOGGED_PARAM_KEY = "";

export function LogMethod(target: Object, key: string, descriptor: TypedPropertyDescriptor<any>) {
    return {
        value: (...args: any[]) => {
            LoggerService[COLOR]("\tMETHOD", "'" + key + "'", "passed args:\t", args, "");
            let result = descriptor.value.apply(target, args);
            LoggerService[COLOR]("\tMETHOD", "'" + key + "'", "returns:\t", typeof result, "");
            const loggedParams: number[] = Reflect.getOwnMetadata(LOGGED_PARAM_KEY, target, key) || [];
            Reflect.defineMetadata(LOGGED_PARAM_KEY, loggedParams, target, key);
            return result;
        }
    }
}
export function LogParam(target: Object, key: string) {
    let value = target[key];

    const getter = () => {
        LoggerService[COLOR](`\t\tGetting value from '${key}':\t`, JSON.stringify(value), "");
        return value;
    };
    const setter = (val) => {
        LoggerService[COLOR](`\t\tSetting value for '${key}':\t`, JSON.stringify(val), "");
        value = val;
    };
    Reflect.deleteProperty[key];
    Reflect.defineProperty(target, key, {
        get: getter,
        set: setter
    });
}

export function Log<T extends { new (...args: any[]): {} }>(constructor: T) {

    let f: any = function (...args) {
        console.log("New: " + constructor.name);
        return new constructor(args);
    }
    f.prototype = constructor.prototype;

    return f;
}