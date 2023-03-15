import React from 'react'
import { APILoader, Map } from '../../../index'
// zoom: 5, //初始化地图级别
// center: [105.602725, 37.076636], //初始化地图中心点位置
// mapStyle: 'amap://styles/darkblue'
const Demo = () => (
	<div>
		<APILoader
			akay="a7a90e05a37d3f6bf76d4a9032fc9129"
			mapStyle="amap://styles/darkblue"
		>
			<Map zoom={5} center={[105.602725, 37.076636]}></Map>

		</APILoader>
	</div>
)

export default Demo
