import { Map } from 'ol'
import { Extent } from 'ol/extent'
import * as React from 'react'

export interface MapContextType {
	map: Map | null
	center: number[] | null
	mapRef: React.MutableRefObject<any> | null
	fieldUriForEdit: string | null
	handleSetFieldUri: (uri: string | null) => void
	handleChangeCenter: (cen: number[]) => void
	handleSetCenterByBbox: (bbox: string) => void
	handleSetCenterByExtent: (extent: Extent) => void
	handleCenterToUserLocation: () => void
}

const MapContext: React.Context<MapContextType> =
	React.createContext<MapContextType>({
		map: null,
		center: [18.6935328, 50.293468],
		mapRef: null,
		fieldUriForEdit: null,
		handleSetFieldUri: () => {},
		handleChangeCenter: () => {},
		handleSetCenterByBbox: () => {},
		handleSetCenterByExtent: () => {},
		handleCenterToUserLocation: () => {},
	})

export default MapContext
