# miniprogram-image

the miniprogram image component for large picture.

-   UX
    -   [x] 模糊缩略图
    -   [x] 错误重试
    -   动画
        -   [x] loading
        -   [x] 淡入
-   API
    -   全局 LoggerHandler
        -   [x] onLoad
        -   [x] onError

## install

```
npm i miniprogram-image -S
```

```json
{
    "usingComponents": {
        "img": "miniprogram-image"
    }
}
```

## usage

### 使用组件

```html
<img
    src="高清大图.jpg"
    data-thumb="缩略图或者本地默认图片.jpg, 无则使用loading动画"
    data-retry="{{1，出错重试次数，默认1次}}"
    data-lazy="{{true}}"
    show-menu-by-longpress="{{false}}"
    mode="scaleToFill"
    bind:fail="onFail"
    bind:update="onUpdate"
    height="高度"
/>
```

### 全局配置

```js
import config from "miniprogram-image/config";
config.retry = 5; //全局默认重试次数，若组件中设置则优先使用组件设置
config.onError = (event, url) => {}; // 出错回调LoggerHandler
config.onLoad = (event, url) => {}; // 成功加载LoggerHandler
```

## examples

![](https://user-images.githubusercontent.com/6290356/48661254-45baa580-eaaa-11e8-8eb9-4096e42fec82.gif)
![](https://user-images.githubusercontent.com/6290356/48661253-44897880-eaaa-11e8-9ba0-b9b4da856514.gif)
