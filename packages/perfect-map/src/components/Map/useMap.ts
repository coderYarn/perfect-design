import { useState, useEffect } from 'react'

import { MapProps } from './Map'
import { MapContext } from './context'
/**
 * 此类型是 `<Map>` 组件传递给子组件(如 `<Marker>`)的两个 props
 */

export interface UseMap extends MapProps {
	/**
	 * 指定的容器
	 */
	container?: HTMLDivElement | null
}

export const useMap = (map) => {
	const [currentMap, setCurrentMap] = useState()
	useEffect(() => {
		setCurrentMap(map)
	}, [map])

	return {
		currentMap
	}
}
