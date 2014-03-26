slideList
==========

**基于jQuery的滑动列表插件**

```js
    slideCount:1,                      // 滚动个数
    space:-10,                         // 移动像素（单位px）
    speed:10,                          // 移动速度（单位ms）
    aniSpeed:300,                      // 运动速度（单位ms）
    margin:0,                          // 元素间间隔
    border:0,                          // 边框宽度
    padding:0,                         // 内边距
    clickOn:false,                     // 整屏滑动开关

    // 元素结构
    eleLabel:"li",                     // 元素标签
    slideClass:".slideDiv",            // 运动层类名
    leftCtrlClass:".leftCtrl",         // 左控制键类名
    rightCtrlClass:".rightCtrl"        // 右控制键类名
```

**滑动方式**

逐个滑动；逐个快速滑动（按住鼠标）；整屏滑动（需开启clickOn:true）

**使用方法**
```js
    $(element).slideList();
    // 默认逐个滑,按住快速滑
    
    $(element).slideList({
    clickOn:true
    });
    // 开启整屏滑动
```
