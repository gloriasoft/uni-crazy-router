/// <reference path="./global.d.ts" />
type to = {
    url: string;
    query?: object | null;
    jumpType: string;
    search?: string;
} & UniCrazyGlobalTypes.UniCrazyRouterParams;
type from = ({
    url: string;
    query?: object | null;
    search?: string;
} & UniCrazyGlobalTypes.UniCrazyRouterParams) | null | undefined;
interface callWithNext {
    (hook: (to: to, from: from, next: Function) => void) : Function;
}
interface callWithoutNext {
    (hook: (to: to, from: from) => void): Function;
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
// for Vue2
declare module "vue/types/vue" {
    interface Vue {
        $routeParams?: object | null;
        $passedParams?: object | null;
    }
}

// for Vue3
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $routeParams?: object | null;
        $passedParams?: object | null;
    }
}
