import { useEffect, useState } from 'react'

export default function useSettingProperties<T, F = {}>(
	instance = {} as T,
	props = {} as F,
	propsName: string[] = []
) {
	propsName.forEach((name) => {
		const eName = `set${name}` as keyof T
		const vName = `${name.charAt(0).toLowerCase()}${name.slice(1)}` as keyof F
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [state, setState] = useState(props[vName])
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useEffect(() => {
			if (instance && props[vName] !== undefined) {
				if (
					props[vName] !== state &&
					instance[eName] &&
					typeof instance[eName] === 'function'
				) {
					;(instance[eName] as any)(props[vName])
					setState(props[vName])
				}
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [instance, props[vName]])
	})
}
