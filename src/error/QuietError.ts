import Errorable from "./Errorable";

export type QuietError = Error & Errorable

class QuietErrorImpl extends Error implements QuietError {
    errorType = "QUIET_ERROR"
}

export function qerr(): QuietError {
    return new QuietErrorImpl()
}

export function isQuietError(obj: unknown): obj is QuietError {
    const bizError = obj as QuietError;
    return bizError.errorType == "QUIET_ERROR"
}
