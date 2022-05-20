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


export const IdleProvider = ({
  timeForInactivity = 30000,
  children,
}: PropsWithChildren<{ timeForInactivity?: number }>) => {
  const timerId = useRef<NodeJS.Timeout | number>();
  const [isIdle, setIsIdle] = useState(false);

  const resetInactivityTimeout = useCallback(() => {
    if (timerId.current) {
      // "as any" avoids react native incompatibilities with 0.64.0
      clearTimeout(timerId.current as any);
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


export const useIdle = () => {
  return useContext(IsIdleContext);
};
