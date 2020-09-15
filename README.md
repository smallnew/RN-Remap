# RN-Remap
> A cmd tool for rn devs，in order to de-obfuscate bug reports from your release builds

## install
`npm install rn-remap -g`
## help

#### cmd example:
```
rn-remap -f ./crash_report.txt -u <your sourcemap remote url> 
eg. http://example.com/maps/index.android.bundle.map
or
rn-remap -f ./crash_report.txt -s <your sourcemap local file path> 
eg. ./index.android.bundle.map
```
#### crash_report.txt content like below:
```
This error is located at:
        in U
...........
        in u, js engine: hermes, stack:
    value@1:1600735
    value@1:742304
    Ll@1:135347
    anonymous@1:221191
    an@1:102288
    Hl@1:133987
    Rl@1:128650
    anonymous@1:102697
    anonymous@1:221191
    an@1:102288
    cn@1:102550
    sn@1:102444
    kl@1:125893
    ha@1:139350
    render@1:149501
    anonymous@1:373914
    run@1:370399
    runApplication@1:370844
    value@1:61833
    anonymous@1:60363
    value@1:61430
    value@1:60321
```

#### remap result below:
```
This error is located at:
        in U
       ....
        in RCTView
        in u, js engine: hermes, stack:
testCrash@28:19(/Users/.../main/main.js)
call@44:2(/Users/.../Page.js)
componentDidMount@6594:29(/Users/.../node_modules/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod.js)
b@18:437(/Users/.../node_modules/scheduler/cjs/scheduler.production.min.js)
Scheduler_runWithPriority@1856:9(/Users/.../node_modules/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod.js)
runWithPriority@6463:2(/Users/.../node_modules/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod.js)
commitRoot@5813:6(/Users/.../node_modules/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod.js)
callback@1889:24(/Users/.../node_modules/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod.js)
b@18:437(/Users/.../node_modules/scheduler/cjs/scheduler.production.min.js)
Scheduler_runWithPriority@1856:9(/Users/.../node_modules/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod.js)
runWithPriority@1886:6(/Users/.../node_modules/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod.js)
flushSyncCallbackQueueImpl@1878:2(/Users/.../node_modules/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod.js)
flushSyncCallbackQueue@5462:44(/Users/.../node_modules/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod.js)
scheduleUpdateOnFiber@7750:2(/Users/.../node_modules/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod.js)
updateContainer@7924:6(/Users/.../node_modules/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod.js)
render@54:45(/Users/.../node_modules/react-native/Libraries/ReactNative/renderApplication.js)
renderApplication@117:8(/Users/.../node_modules/react-native/Libraries/ReactNative/AppRegistry.js)
run@202:22(/Users/.../node_modules/react-native/Libraries/ReactNative/AppRegistry.js)
apply@425:41(/Users/.../node_modules/react-native/Libraries/BatchedBridge/MessageQueue.js)
__callFunction@112:11(/Users/.../node_modules/react-native/Libraries/BatchedBridge/MessageQueue.js)
fn@373:8(/Users/.../node_modules/react-native/Libraries/BatchedBridge/MessageQueue.js)
__guard@111:9(/Users/.../node_modules/react-native/Libraries/BatchedBridge/MessageQueue.js)
```

