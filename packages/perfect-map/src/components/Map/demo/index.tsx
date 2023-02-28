import React, { useRef } from 'react'
import { Map, MapKey, Marker, APILoader } from 'perfectMap'
import Punctuation from '../../assets/punctuation.svg'
import ActivePun from '../../assets/activePun.svg'
import GreenPun from '../../assets/greenPun.svg'
import { useMap } from '../useMap'
import { useState } from 'react'

function App() {
	const warpper = useRef<any>(null)
	const [center, setCenter] = useState([116.397428, 39.90923])
	const { setContainer } = useMap({
		container: warpper.current
	})

	const lnglats = [
		{
			title: '竹苑市场',
			groups: 'blue',
			position: { lng: 113.397799, lat: 22.51511 },
			icon: Punctuation
		},
		{
			title: '宏宇大厦',
			position: { lng: 113.399883, lat: 22.51235 },
			groups: 'blue',
			icon: Punctuation
		},
		{
			title: '宝利大厦',
			position: { lng: 113.401555, lat: 22.51464 },
			groups: 'green',
			icon: GreenPun
		},
		{
			title: '竹苑小学',
			position: { lng: 113.398724, lat: 22.518455 },
			groups: 'green',
			icon: GreenPun
		}
	]
	const onClick = (e: any) => {
		console.log(e)
	}
	const removeMarker = () => {
		// ref.current.removeMarker('blue')
	}
	return (
		<div style={{ height: '300px', width: '750px' }}>
			<button onClick={removeMarker}>+</button>
			<APILoader akay={'9ba7e2f5c979b67281c5833918d6dfa0'}>
				<Map center={center}></Map>
			</APILoader>
		</div>
	)
}

export default App
