import React, { useEffect } from 'react'
import { Map, APILoader, useMapContext } from 'perfectMap'

const Demo = () => {
	const { map } = useMapContext()

	useEffect(() => {
		if (map) {
			console.log(AMap.Driving)

			AMap.plugin(['AMap.Driving'], function () {
				var driving = new AMap.Driving({
					policy: AMap.DrivingPolicy.LEAST_TIME,
					map: map
				})
				var startLngLat = [116.379028, 39.865042]
				var endLngLat = [116.427281, 39.903719]
				var points = [
					{ keyword: '北京市地震局（公交站）', city: '北京' },
					{ keyword: '亦庄文化园（地铁站）', city: '北京' }
				]

				driving.search(startLngLat, endLngLat, function (
					status,
					result
				) {} as any)
			})
		}
	}, [map])

	return null
}

function demo2() {
	return (
		<div style={{ height: '300px' }}>
			<APILoader
				akay={'9ba7e2f5c979b67281c5833918d6dfa0'}
				plugin="AMap.Driving"
			>
				<Map center={[116.397428, 39.90923]}>
					<Demo></Demo>
				</Map>
			</APILoader>
		</div>
	)
}

export default demo2
