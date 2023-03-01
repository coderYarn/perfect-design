import { defineConfig } from 'dumi'
import path from 'path'

let base: string | undefined
let publicPath: string | undefined

if (process.env.PREVIEW !== '1') {
	base = '/perfect-map/' // 后续部署到gh-pages如果不配置路径会找不到资源
	publicPath = '/perfect-map/'
}

export default defineConfig({
	base,
	publicPath,
	title: 'PerfectMap', // 站点名称
	outputPath: 'docs-dist', // 输出文件夹
	resolve: {
		docDirs: ['docs'],
		atomDirs: [
			// 在这里修改components的匹配路径
			{ type: 'component', dir: '/packages/perfect-map/src/components' }
		],
		codeBlockMode: 'passive'
	},
	alias: {
		perfectMap: path.join(__dirname, 'packages/perfect-map/src') // 配置引入别名
	},
	themeConfig: {
		name: 'PerfectMap',
		carrier: 'dumi', // 设备状态栏左侧的文本内容
		hd: true,
		rtl: true,
		nav: [
			// dumi的菜单路由
			{
				title: '指南',
				link: '/guide'
			},
			{
				title: '组件',
				link: '/components/api-loader'
			}
		]
	}
})
