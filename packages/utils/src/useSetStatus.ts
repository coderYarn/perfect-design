import { useEffect, useState } from 'react'

export default function useSetStatus<
	T extends { getStatus: () => any; setStatus: (opt: any) => void },
	F = {}
>(instance: T, props = {} as F, propsName: string[] = []) {
	propsName.forEach((name) => {
		const eName = name as keyof F
		const [state, setState] = useState(props[eName])
		useEffect(() => {
			if (instance && props[eName] !== undefined) {
				if (props[eName] !== state) {
					const status = instance.getStatus()
					instance.setStatus({ ...status, [eName]: props[eName] })
					setState(props[eName])
				}
			}
		}, [instance, props[eName]])
	})
}
