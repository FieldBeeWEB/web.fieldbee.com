import { Map, View as OlView } from 'ol'
import { defaults as defaultControls } from 'ol/control.js'
import { Extent } from 'ol/extent'
import { fromLonLat, transform } from 'ol/proj'
import * as React from 'react'
import { toast } from '../../../helpers/toast'
import { API_MAP_PROJECTION, WEB_APP_MAP_PROJECTION } from './consts'
import MapContext from './map-context'

export const FALLBACK_CENTER = [18.6935328, 50.293468]

const GEOLOCATION_ERROR_MESSAGES: Record<number, string> = {
	1: 'Location access denied. Using default location.',
	2: 'Location unavailable. Using default location.',
	3: 'Location request timed out. Using default location.',
}

const GEOLOCATION_OPTION: PositionOptions = {
	enableHighAccuracy: true,
	timeout: 10000,
	maximumAge: 60000,
}

const MapProvider = ({ children }: any) => {
	const zoom = 16
	const mapRef = React.useRef<any>()
	const [center, setCenter] = React.useState<number[]>(FALLBACK_CENTER)
	const [map, setMap] = React.useState<Map | null>(null)
	const [fieldUriForEdit, setFieldUriForEdit] = React.useState<string | null>(
		null
	)

	const handleSetFieldUri = (uri: string | null) => {
		setFieldUriForEdit(uri)
	}

	const handleChangeCenter = (cen: number[]) => {
		setCenter(cen)
	}

	const handleSetCenterByBbox = (bbox: string) => {
		const coords = bbox.split(',')
		const center = {
			bounds: [
				parseFloat(coords[0]),
				parseFloat(coords[1]),
				parseFloat(coords[2]),
				parseFloat(coords[3]),
			],
			lat:
				parseFloat(coords[1]) +
				(parseFloat(coords[3]) - parseFloat(coords[1])) / 2,
			lon:
				parseFloat(coords[2]) +
				(parseFloat(coords[0]) - parseFloat(coords[2])) / 2,
			zoom: 10,
		}

		if (isNaN(center.lat) || isNaN(center.lon)) {
			// console.log("olMap: updateMapCenter: invalid coords");
			return
		}

		// transformed coordinates
		const tc = transform(
			[parseFloat(coords[0]), parseFloat(coords[1])],
			API_MAP_PROJECTION,
			WEB_APP_MAP_PROJECTION
		).concat(
			transform(
				[parseFloat(coords[2]), parseFloat(coords[3])],
				API_MAP_PROJECTION,
				WEB_APP_MAP_PROJECTION
			)
		)

		// maximizing bbox
		const dx = (tc[2] - tc[0]) * 0.25
		const dy = (tc[3] - tc[1]) * 0.25
		tc[0] = tc[0] - dx
		tc[1] = tc[1] - dy
		tc[2] = tc[2] + dx
		tc[3] = tc[3] + dy
		if (map) {
			map.getView().fit(tc, { size: map.getSize() })
		}

		handleChangeCenter([center.lon, center.lat])
	}
	const handleSetCenterByExtent = (extent: Extent) => {
		const center = {
			bounds: [extent[0], extent[1], extent[2], extent[3]],
			lat: extent[1] + (extent[3] - extent[1]) / 2,
			lon: extent[2] + (extent[0] - extent[2]) / 2,
			zoom: 10,
		}

		if (isNaN(center.lat) || isNaN(center.lon)) {
			// console.log("olMap: updateMapCenter: invalid coords");
			return
		}

		// transformed coordinates
		const tc = transform(
			[extent[0], extent[1]],
			API_MAP_PROJECTION,
			WEB_APP_MAP_PROJECTION
		).concat(
			transform(
				[extent[2], extent[3]],
				API_MAP_PROJECTION,
				WEB_APP_MAP_PROJECTION
			)
		)

		// maximizing bbox
		const dx = (tc[2] - tc[0]) * 0.25
		const dy = (tc[3] - tc[1]) * 0.25
		tc[0] = tc[0] - dx
		tc[1] = tc[1] - dy
		tc[2] = tc[2] + dx
		tc[3] = tc[3] + dy
		if (map) {
			map.getView().fit(tc, { size: map.getSize() })
		}
		handleChangeCenter([center.lon, center.lat])
	}

	const handleCenterToUserLocation = () => {
		if (!navigator.geolocation) {
			toast.error('Geolocation is not supported by your browser.')
			return
		}

		navigator.geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords
				setCenter([longitude, latitude])
			},
			error => {
				toast.error(
					GEOLOCATION_ERROR_MESSAGES[error.code] ||
						'Error getting location. Using default location.'
				)
			},
			GEOLOCATION_OPTION
		)
	}

	React.useEffect(() => {
		let options = {
			view: new OlView({ zoom, center: fromLonLat(center) }),
			controls: defaultControls(),
			overlays: [],
			projection: WEB_APP_MAP_PROJECTION,
		}

		let mapObject = new Map(options)
		mapObject.setTarget(mapRef.current)

		handleCenterToUserLocation()

		setMap(mapObject)
		return () => mapObject.setTarget(undefined)
	}, [])

	React.useEffect(() => {
		if (!map) return
		map.getView().setZoom(zoom)
	}, [zoom])

	React.useEffect(() => {
		if (!map) return
		map.getView().setCenter(fromLonLat(center))
	}, [center])

	return (
		<MapContext.Provider
			value={{
				map,
				center,
				mapRef,
				fieldUriForEdit,
				handleSetFieldUri,
				handleChangeCenter,
				handleSetCenterByBbox,
				handleSetCenterByExtent,
				handleCenterToUserLocation,
			}}
		>
			{children}
		</MapContext.Provider>
	)
}
export default MapProvider
