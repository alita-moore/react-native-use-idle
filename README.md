A simple way to detect inactivity.
```ts
// you need to add IdleProvider at the top level
const isIdle = useIdle()
```

### Getting Started
#### Install
`yarn add react-native-use-idle`
#### Add the Provider At the Top Level
```ts
import { IdleProvider } from "react-native-use-idle";

// top level of code you want to monitor
const App = () => {
    return (
        // optionally set a timeForInactivity variable (default 30s)
        <IdleProvider>
            {...your app}
         </IdleProvider>
    )
}
```
#### Using useIdle
```ts
import { useIdle } from "react-native-use-idle";

const Component = () => {
    const isIdle = useIdle();
    useEffect(() => {
         if (!isIdle) console.log("not idle");
         console.log("is idle");
    },[])
}
```