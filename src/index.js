"use strict";
exports.__esModule = true;
exports.useIdle = exports.IdleContainer = void 0;
var React = require("react");
var react_native_1 = require("react-native");
var react_1 = require("react");
var IsIdleContext = (0, react_1.createContext)(false);
var IdleContainer = function (_a) {
  var _b = _a.timeForInactivity,
    timeForInactivity = _b === void 0 ? 30000 : _b,
    children = _a.children;
  var timerId = (0, react_1.useRef)();
  var _c = (0, react_1.useState)(false),
    isIdle = _c[0],
    setIsIdle = _c[1];
  var resetInactivityTimeout = (0, react_1.useCallback)(
    function () {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
      console.log("reset timer");
      setIsIdle(false);
      timerId.current = setTimeout(function () {
        console.log("is idle");
        setIsIdle(true);
      }, timeForInactivity);
    },
    [timeForInactivity]
  );
  (0, react_1.useEffect)(
    function () {
      resetInactivityTimeout();
    },
    [resetInactivityTimeout]
  );
  var panResponder = (0, react_1.useRef)(
    react_native_1.PanResponder.create({
      onStartShouldSetPanResponderCapture: function () {
        resetInactivityTimeout();
        return false;
      },
      onMoveShouldSetPanResponderCapture: function () {
        resetInactivityTimeout();
        return false;
      },
    })
  ).current;
  return (
    <IsIdleContext.Provider value={isIdle}>
      <react_native_1.View style={{ flex: 1 }} {...panResponder.panHandlers}>
        {children}
      </react_native_1.View>
    </IsIdleContext.Provider>
  );
};
exports.IdleContainer = IdleContainer;
var useIdle = function () {
  return (0, react_1.useContext)(IsIdleContext);
};
exports.useIdle = useIdle;
