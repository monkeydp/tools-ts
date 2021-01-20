/**
 * 内部异常
 */
import Errorable from "./Errorable";

export type InnerError = Error & Errorable

export class BaseInnerError implements InnerError {
    readonly message: string;
    readonly name: string;
    readonly stack?: string;
    readonly errorType = "INNER_ERROR"

    constructor(message: string, name = "", stack?: string) {
        this.message = message;
        this.name = name;
        this.stack = stack;
    }
}

class StdInnerError extends BaseInnerError {
    constructor(message: string, name = "", stack?: string) {
        super(message, name, stack);
    }
}

export default function ierror(
    message: string,
    name = "",
    stack: string | undefined = undefined
): never {
    throw new StdInnerError(message, name, stack)
}

export function isInnerError(obj: unknown): obj is InnerError {
    const innerError = obj as InnerError;
    return innerError.errorType == "INNER_ERROR"
}
