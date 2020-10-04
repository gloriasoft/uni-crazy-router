/// <reference path="@dcloudio/types/uni-app/uni.d.ts" />
declare namespace UniCrazyGlobalTypes {
    interface UniCrazyRouterParams {
        passedParams?: object | null;
        routeParams?: object | null;
    }
    interface UniJumpOptions {
        redirectTo: UniApp.RedirectToOptions;
        reLaunch: UniApp.ReLaunchOptions;
        switchTab: UniApp.SwitchTabOptions;
        navigateBack: UniApp.NavigateBackOptions;
        navigateTo: UniApp.NavigateToOptions;
    }
    type TypeJumpFunction <OPT> = (options: OPT & UniCrazyRouterParams) => void;
    type MergeUniJump = {[P in keyof UniJumpOptions]: TypeJumpFunction <UniJumpOptions[P]>};
    type MergeUni = Omit <UniApp.Uni, keyof UniJumpOptions> & MergeUniJump;
}
declare const uni: UniCrazyGlobalTypes.MergeUni;
