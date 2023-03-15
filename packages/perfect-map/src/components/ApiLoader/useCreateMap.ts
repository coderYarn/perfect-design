import AMapLoader from '@amap/amap-jsapi-loader'

class MapObject {
	mapStack: any
	constructor() {
		this.mapStack = new Map()
	}
	create(id, params) {
		return new Promise((resolve)=>{
            AMapLoader.load({
                key: params.akay,
                version: params.version,
                plugins: params.plugins
            }).then((AMap) => {
                const map = new AMap.Map(id, params)
                this.mapStack.set(id, map)
                resolve(this.mapStack.get(id))
            })
        })
	}

	getMap(id: string) {
		return this.mapStack.get(id)
	}
}

const useCreateMap = (function () {
	var constance = null
	return function Construt() {
		if (!constance) {
			constance = new MapObject()
		}
		return constance
	}
})()

export default useCreateMap
