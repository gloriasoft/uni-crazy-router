declare namespace UniCrazyGlobalTypes {
    interface UniCrazyRouterParams {
        passedParams?: object | null;
        routeParams?: object | null;
    }
}

declare namespace UniApp {
    interface RedirectToOptions extends UniCrazyGlobalTypes.UniCrazyRouterParams {}
    interface ReLaunchOptions extends UniCrazyGlobalTypes.UniCrazyRouterParams {}
    interface SwitchTabOptions extends UniCrazyGlobalTypes.UniCrazyRouterParams {}
    interface NavigateBackOptions extends UniCrazyGlobalTypes.UniCrazyRouterParams {}
    interface NavigateToOptions extends UniCrazyGlobalTypes.UniCrazyRouterParams {}
}
