import React, { useEffect, useRef } from 'react'
import { Map, APILoader } from 'perfectMap'

function App() {
	const AMapRef = useRef()

	// console.log(AMapRef);

	return (
		<div style={{ height: '300px' }}>
			<button>+</button>
			<APILoader
				akay={'9ba7e2f5c979b67281c5833918d6dfa0'}
				plugin="AMap.Driving"
			>
				<Map></Map>
			</APILoader>
		</div>
	)
}

export default App
