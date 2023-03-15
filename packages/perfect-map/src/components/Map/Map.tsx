import { useEffect, useContext, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { useMount } from 'react-use'
import React from 'react'
import { useMap } from './useMap'
import useCreateMap from '../ApiLoader/useCreateMap'

type RenderProps =
	| {
			children?: (data: {
				AMap: typeof AMap
				map: AMap.Map
				container?: HTMLDivElement | null
			}) => undefined
	  }
	| { children?: React.ReactNode }

export interface MapProps extends AMap.MapEvents, AMap.MapOptions {
	className?: React.HTMLAttributes<HTMLDivElement>['className']
	style?: React.HTMLAttributes<HTMLDivElement>['style']
	container?: HTMLDivElement | null
	children?: JSX.Element & RenderProps['children']
}

 function Map(props: MapProps,AMapRef) {
	const MapObj = useCreateMap()
	const ref = useRef()
	const [mapInstance, setMapInstance] = useState()
  useImperativeHandle(AMapRef,()=>{
    return {
      map:currentMap
    }
  })
	useMount(async () => {
		const mp = await MapObj.create(ref.current, {
			akay: 'a7a90e05a37d3f6bf76d4a9032fc9129',
			mapStyle: 'amap://styles/darkblue'
		})
		setMapInstance(mp)
	})
	const { currentMap } = useMap(mapInstance)


	return <div ref={ref} className="map" style={{ height: '800px' }}></div>
}

export default forwardRef(Map)
