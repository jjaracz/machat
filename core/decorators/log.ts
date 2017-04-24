import { LoggerService } from "../services";
import "reflect-metadata";

const COLOR = "green";
const LOGGED_PARAM_KEY = "";

export function LogMethod(target: Object, key: string, descriptor: TypedPropertyDescriptor<any>) {
    return {
        value: (...args: any[]) => {
            LoggerService[COLOR]("\tMETHOD", "'"+key+"'", "passed args:\t", args);
            let result = descriptor.value.apply(target, args);
            LoggerService[COLOR]("\tMETHOD", "'"+key+"'", "returns:\t", typeof result);
            const loggedParams: number[] = Reflect.getOwnMetadata(LOGGED_PARAM_KEY, target, key) || [];
            Reflect.defineMetadata(LOGGED_PARAM_KEY, loggedParams, target, key);
            return result;
        }
    }
}
export function LogParam(target: Object, key: string) {
    let value = target[key];

    const getter = () =>  {
        LoggerService[COLOR](`\t\tGetting value from '${key}':\t${value}`);
        return value;
    };
    const setter = (val) => {
        LoggerService[COLOR](`\t\tSetting value for '${key}':\t\t${value}`);
        value = val;
    };
    Reflect.deleteProperty[key];
    Reflect.defineProperty(target, key, {
        get: getter,
        set: setter
    });
}

// export function Log(target: any) {
//     // const loggedParams: number[] = Reflect.getOwnMetadata(LOGGED_PARAM_KEY, target) || [];
//     function newConstructor(...args) {
//         // console.log("Logged params: ", loggedParams.map(index => args[index]).join(", "));
//         new target();
//     }
//     newConstructor.prototype = target.prototype;
//     return newConstructor;
// }
export function Log<T extends {new(...args:any[]):{}}>(ctor:T) {
    return class extends ctor {
        newProperty = "new property";
        hello = "override";
    }
}