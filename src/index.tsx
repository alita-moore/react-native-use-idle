import * as React from "react";
import { PanResponder, View } from "react-native";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const IsIdleContext = createContext(false);

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
export const IdleProvider = ({
  timeForInactivity = 30000,
  children,
}: PropsWithChildren<{ timeForInactivity?: number }>) => {
  const timerId = useRef<NodeJS.Timeout>();
  const [isIdle, setIsIdle] = useState(false);

  const resetInactivityTimeout = useCallback(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    setIsIdle(false);
    timerId.current = setTimeout(() => {
      setIsIdle(true);
    }, timeForInactivity);
  }, [timeForInactivity]);

  useEffect(() => {
    resetInactivityTimeout();
  }, [resetInactivityTimeout]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        resetInactivityTimeout();
        return false;
      },
      onMoveShouldSetPanResponderCapture: () => {
        resetInactivityTimeout();
        return false;
      },
    })
  ).current;

  return (
    <IsIdleContext.Provider value={isIdle}>
      <View style={{ flex: 1 }} {...panResponder.panHandlers}>
        {children}
      </View>
    </IsIdleContext.Provider>
  );
};

/** *
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
export const useIdle = () => {
  return useContext(IsIdleContext);
};
