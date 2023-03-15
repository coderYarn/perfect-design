/// <reference types="@perfect-map/types" />
import React, {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState
} from 'react'
import { useMount } from 'react-use'
import AMapLoader from '@amap/amap-jsapi-loader'
import { Provider } from '../Map/context'
import useCreateMap from './useCreateMap'
export type APILoaderConfig = PropsWithChildren<{
	/**
	 * akay 密钥
	 * 您需先[申请密钥(ak)](https://lbs.amap.com/dev/key/app)。开发文档说明地址：https://lbs.amap.com/api/javascript-api/guide/abc/prepare
	 *
	 * 1. 首先，[注册开发者账号](https://lbs.amap.com/dev/id/newuser)，成为高德开放平台开发者
	 * 2. 登陆之后，在进入「应用管理」 页面「创建新应用」
	 * 3. 为应用[添加 Key](https://lbs.amap.com/dev/key/app)，「服务平台」一项请选择「 Web 端 ( JSAPI ) 」
	 *
	 */
	akay: string
	/**
	 * SDK 包版本
	 * @default 1.4.15
	 */
	version?: string
	/**
	 * 协议，默认是根据当前网站协议的
	 */
	protocol?: 'http' | 'https'
	/**
	 * 请求 SDK 的前半部分
	 * https://webapi.amap.com/maps?v=1.4.15&key=您申请的key值
	 * @default webapi.amap.com/maps
	 */
	hostAndPath?: string
	/**
	 * JSONP 回调函数
	 */
	callbackName?: string
	/**
	 * 加载一个或者多个插件
	 * @example `AMap.ToolBar,AMap.Driving`
	 */
	plugin?: string[]
	securityJsCode?: string
}>

const useFilterElement = (children: React.ReactNode, displayName: string) => {
	return React.Children.map(children, (child: any) => {
		if (child.type.displayName === displayName) {
			return child
		}
	})
}
export interface APILoaderProps extends APILoaderConfig {
	/**
	 * 用于展示加载中或错误状态
	 */
	mapStyle?: string
	fallback?: (error?: Error) => React.ReactNode
}
/**
 * APILoader 用于加载百度地图依赖
 */
export default function APILoader(props: APILoaderProps) {
	const { children } = props
	return <>{children}</>
}
