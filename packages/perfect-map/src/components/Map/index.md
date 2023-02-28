---
title: Map
nav:
  title: 组件
  path: /common
group:
  title: 基础
mobile: false
toc: content
---

# Map

显示地区模范。

## 基本使用

地图基本使用。

<code src="./demo/index.tsx"></code>

定制主题。

<code src="./demo/index2.tsx"></code>

添加插件

<code src="./demo/index3.tsx"></code>

## API

| Name      | Description      | Type                      | Default |
| --------- | ---------------- | ------------------------- | ------- |
| style     | 自定义样式       | `CSSProperties`           | `--`    |
| className | 类名             | `string`                  | `--`    |
| center    | 中心点           | [`lng`,`lat`]             | `[]`    |
| zoom      | 显示大小         | `number`                  | `''`    |
| rotation  | 旋转角度         | `number`                  | `0`     |
| skyColor  | 天空颜色         | `'string  Array<number>'` | `--`    |
| showIcon  | 显示警告提示图标 | `boolean`                 | `true`  |
| mask      | 自定义关闭图标   | `Array<number> `          | `--`    |
