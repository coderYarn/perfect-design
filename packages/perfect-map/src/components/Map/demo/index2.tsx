import React from 'react'
import { Map, APILoader } from 'perfectMap'
function demo2() {
	return (
		<div style={{ height: '300px' }}>
			<APILoader akay={'9ba7e2f5c979b67281c5833918d6dfa0'}  plugin="AMap.ToolBar">
				<Map
					center={[116.397428, 39.90923]}
					mapStyle={'amap://styles/darkblue'}
				></Map>
			</APILoader>
		</div>
	)
}

export default demo2