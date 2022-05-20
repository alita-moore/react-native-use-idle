import {PropsWithChildren} from "react";

declare module 'react-native-use-idle' {

    /**
     * @returns (boolean) a stateful boolean for isIdle, this requires that IdleProvider be implemented at the top level
     * ```ts
     * const Component = () => {
     *     const isIdle = useIdle();
     *     useEffect(() => {
     *          if (!isIdle) console.log("not idle");
     *          console.log("is idle");
     *     },[])
     * }
     * ```
     */
    export function useIdle(): boolean;

    /**
     * Top level provider container
     * @param timeForInactivity (number): time in milliseconds before idle; default is 30000 or 30 seconds
     *
     * ```ts
     * const App = () => {
     *     return (
     *         <IdleProvider>
     *             {...your app}
     *          </IdleProvider>
     *     )
     * }
     * ```
     *
     * This utilizes the pan handlers that are provided by react native. This acts as a standard listener
     * so that means there are many events. Therefore, the root code clears and re-instantiates a set timeout
     * every time an action is performed. This is unlikely to cause issues with your app.
     * */
    export function IdleProvider(props: PropsWithChildren<{ timeForInactivity?: number }>): JSX.Element;
}

