interface callWithNext {
    (hook: (to: any, from: any, next: Function) => void) : Function;
}
interface callWithoutNext {
    (hook: (to: any, from: any) => void): Function;
}
interface normalCall {
    (call: Function): void;
}
export const beforeEach: callWithNext;
export const afterEach: callWithoutNext;
export const onError: callWithoutNext;
export const afterNotNext: normalCall;
interface uniCrazyRouter {
    beforeEach: callWithNext;
    afterEach: callWithoutNext;
    onError: callWithoutNext;
    afterNotNext: normalCall;
    install: any;
}
declare const uniCrazyRouter: uniCrazyRouter;
export default uniCrazyRouter;
