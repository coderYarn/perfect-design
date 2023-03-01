import React, { useRef } from 'react'
import { Map, APILoader } from 'perfectMap'

function App() {
  const AMapRef = useRef()
	return (
		<div style={{ height: '300px' }}>
			<APILoader akay={'9ba7e2f5c979b67281c5833918d6dfa0'}  plugin="AMap.Driving">
				<Map ref={AMapRef}></Map>
			</APILoader>
		</div>
	)
}
 


export default App
