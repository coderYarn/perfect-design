import AMapLoader from '@amap/amap-jsapi-loader'
import { useRef, useState } from 'react'

class MapObject {
	mapStack: any
	constructor() {
		this.mapStack = new Map()
	}
	create(id, params) {
		AMapLoader.load({
			key: params.akay,
			version: params.version,
			plugins: params.plugins
		}).then((AMap) => {
			const map = new AMap.Map(id, params)
			this.mapStack.set(id, map)
		})
	}


}
let map = new MapObject()
const useCreateMap = function () {
	// const [map, setMap] = useState()
	const ref = useRef<any>()
	if (ref.current) {
		return ref.current
	}
	ref.current = map

	return ref.current
}

export default useCreateMap
