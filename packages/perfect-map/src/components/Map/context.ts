import React, { createContext } from 'react';
interface MapContextProps {
	map: AMap.Map
}
export const MapContext = createContext<MapContextProps>({
	map: null
})

export const Provider =  MapContext.Provider