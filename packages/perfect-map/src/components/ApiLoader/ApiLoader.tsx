/// <reference types="@perfect-map/types" />
import React, { Component, PropsWithChildren } from 'react'

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
	plugin?: string
	securityJsCode?: string
}>

export function delay(time: number): Promise<undefined> {
	return new Promise((resolve, reject) => {
		window.setTimeout(resolve, time)
	})
}

export interface APILoaderProps extends APILoaderConfig {
	/**
	 * 用于展示加载中或错误状态
	 */
	fallback?: (error?: Error) => React.ReactNode
}

interface State {
	loaded: boolean
	error?: Error
}

const DEFAULT_RETRY_TIME = 3

/**
 * APILoader 用于加载百度地图依赖
 */
export class APILoader extends Component<APILoaderProps> {
	public static defaultProps = {
		protocol: /^file:/.test(window.location.protocol)
			? 'https'
			: window.location.protocol,
		akay: '',
		hostAndPath: 'webapi.amap.com/maps',
		version: '2.0',
		callbackName: 'load_amap_sdk',
		plugin: ''
	}

	private isMountedOk: boolean = false

	/**
	 * 全局可能存在多个 Loader 同时渲染, 但是只能由一个负责加载
	 */
	private static waitQueue: Array<[Function, Function]> = []
	public state: State = {
		loaded: !!window.AMap
	}

	public constructor(props: APILoaderProps) {
		super(props)
		if ((props as any).akay === null) {
			throw new TypeError('AMap: akay is required')
		}
	}

	public componentDidMount() {
		this.isMountedOk = true
		const { callbackName } = (this as any).props
		if (window.AMap == null) {
			if (window[callbackName as any]) {
				APILoader.waitQueue.push([this.finish, this.handleError])
				return
			}
			this.loadMap()
		}
	}

	componentWillUnmount() {
		this.isMountedOk = false
	}

	public render() {
		if (this.state.loaded) {
			return (this as any).props.children
		}
		if ((this as any).props.fallback) {
			return (this as any).props.fallback(this.state.error)
		}
		if (this.state.error) {
			return <div style={{ color: 'red' }}>{this.state.error.message}</div>
		}
		return null
	}

	private getScriptSrc() {
		const cfg = (this as any).props
		let protocol = (cfg.protocol ||
			window.location.protocol) as APILoaderConfig['protocol']
		if (protocol!.indexOf(':') === -1) {
			protocol += ':'
		}

		let plugin = ''
		if (cfg.plugin) {
			plugin = `&plugin=${cfg.plugin}`
		}

		return `${protocol}//${cfg.hostAndPath}?v=${cfg.version}&key=${cfg.akay}&callback=${cfg.callbackName}${plugin}`
	}
	/**
	 * load BaiduMap in script tag
	 */
	private async loadMap() {
		const { callbackName } = (this as any).props
		const src = this.getScriptSrc()
		;(window as any)[callbackName as any] = () => {
			// flush queue
			const queue = APILoader.waitQueue
			APILoader.waitQueue = []
			queue.forEach((task) => task[0]())
			this.finish()
		}

		for (let i = 0; i < DEFAULT_RETRY_TIME; i++) {
			try {
				const srcipt = document.createElement('script')
				srcipt.type = 'text/javascript'
				srcipt.innerHTML = `
        window._AMapSecurityConfig = {
          securityJsCode:'c72061ac3536c85210f74ae2aa07f004',
      }`
        document.head.appendChild(srcipt)
				await requireScript(src)
				break
			} catch (error: any) {
				if (i === DEFAULT_RETRY_TIME - 1) {
					const err = new Error(`Failed to load AMap: ${error.message}`)
					// flush queue
					const queue = APILoader.waitQueue
					APILoader.waitQueue = []
					queue.forEach((task) => task[1](err))
					this.handleError(err)
					return
				}
				await delay(i * 1000)
			}
		}
	}

	private handleError = (error: Error) => {
		if (this.isMountedOk) {
			;(this as any).setState({ error })
		}
	}

	private finish = () => {
		if (this.isMountedOk) {
			;(this as any).setState({
				loaded: true
			})
		}
	}
}

const _importedScript: { [src: string]: true } = {}

/**
 * load dependency by css tag
 */
export function requireCss(
	src: string,
	id: string = '_react_amap_css'
): Promise<void> {
	const headElement =
		document && (document.head || document.getElementsByTagName('head')[0])
	const dom = document.getElementById(id)
	return new Promise((resolve, reject) => {
		if (!document || src in _importedScript || dom) {
			resolve()
			return
		}
		const script = document.createElement('link')
		script.type = 'text/css'
		script.rel = 'stylesheet'
		script.id = id
		script.href = src
		script.onerror = (err) => {
			headElement.removeChild(script)
			reject(new URIError(`The css ${src} is no accessible.`))
		}
		script.onload = () => {
			_importedScript[src] = true
			resolve()
		}
		headElement.appendChild(script)
	})
}

/**
 * load dependency by script tag
 */
export function requireScript(
	src: string,
	id: string = '_react_amap_plugin'
): Promise<void> {
	const headElement =
		document && (document.head || document.getElementsByTagName('head')[0])
	const dom = document.getElementById(id)
	return new Promise((resolve, reject) => {
		if (!document || src in _importedScript || dom) {
			resolve()
			return
		}
		const script = document.createElement('script')
		script.type = 'text/javascript'
		script.id = id
		script.async = true
		script.defer = true
		script.src = src
		script.onerror = (err) => {
			headElement.removeChild(script)
			reject(new URIError(`The Script ${src} is no accessible.`))
		}
		script.onload = () => {
			_importedScript[src] = true
			resolve()
		}

		headElement.appendChild(script)
	})
}
