import React, { useRef } from 'react'
import { Map, MapKey, Marker } from 'perfectMap'
import Punctuation from '../../assets/punctuation.svg'
import ActivePun from '../../assets/activePun.svg'
import GreenPun from '../../assets/greenPun.svg'

function App() {
	const ref = useRef<any>(null)

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
		console.log(ref.current.map.current.getCenter())
		ref.current.map.current.setCenter([113.397694, 22.514927])
	}
	return (
		<div style={{ height: '300px', width: '750px' }}>
			<button onClick={removeMarker}>+</button>
			<MapKey mapKey={'c72061ac3536c85210f74ae2aa07f004'}>
				<Map ref={ref as any}>
					{lnglats.map((item) => {
						return (
							<Marker
								onClick={onClick}
								key={item.title}
								title={item.title}
								position={item.position}
								activeIcon={ActivePun}
								Icon={item.icon}
								isActive={true}
								groups={item.groups}
							></Marker>
						)
					})}
				</Map>
			</MapKey>
		</div>
	)
}

export default App
