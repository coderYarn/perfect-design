import React, { useEffect, useRef } from 'react'
import { Map, APILoader, useMap, useMapContext, Provider } from 'perfectMap'

const Demo = () => {
	const { map } = useMapContext()

	useEffect(() => {
		if (map) {
			const ToolBar = new AMap.ToolBar()
			map.addControl(ToolBar)
		}
	}, [map])

	return null
}

function demo2() {
	return (
		<div style={{ height: '300px' }}>
			<APILoader
				akay={'9ba7e2f5c979b67281c5833918d6dfa0'}
				plugin="AMap.ToolBar"
			>
				<Map center={[116.397428, 39.90923]}>
					<Demo></Demo>
				</Map>
			</APILoader>
		</div>
	)
}

export default demo2
