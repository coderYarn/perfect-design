---
title: APILoader
nav:
  title: 组件
  path: /common
group:
  title: 基础
mobile: false
toc: content
---

# Map

向用户显示警告的信息时，通过警告提示，展现需要关注的信息。

## 基本使用

警告提示，展现需要关注的信息，适用于简短的警告提示。

<code src="./demo/index.tsx"></code>

## API

| Name         | Description                                                         | Type           | Default                    |
| ------------ | ------------------------------------------------------------------- | -------------- | -------------------------- |
| akay         | 必填 您需先申请密钥（ak）才可使用该服务。⚠️ 注意申请 Web 端(JS API) | `string`       | `--`                       |
| version      | SDK 版本                                                            | `string`       | `--`                       |
| version      | version                                                             | `http`/`https` | `window.location.protocol` |
| hostAndPath  | 请求 SDK 的前半部分                                                 | `string`       | `webapi.amap.com/maps`     |
| callbackName | 回调函数                                                            | `string`       | `load_amap_sdk`            |
| plugin       | 加载一个或者多个插件 `AMap.ToolBar,AMap.Driving`                    | `string`       | `--`                       |
