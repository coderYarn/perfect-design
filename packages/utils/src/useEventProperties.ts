import { useEffect } from "react";

export function useEventProperties<T extends AMap.MapEventListener<any>, F>(
    instance: T,
    props = {} as F,
    eventName: string[] = [],
    type?: any,
  ) {
    eventName.forEach((name) => {
      const eventName = name as keyof F;
      const eventHandle = props[eventName];

      useEffect(() => {
        if (!instance) return;
        let eName = name.toLocaleLowerCase().replace(/^on/, '');
        if (eventHandle && eName) {
          instance.on(eName, eventHandle);
        }
        return () => {
          if (eName && eventHandle) {
            instance.off(eName, eventHandle);
          }
        };

      }, [instance, props[eventName]]);
    });
  }

  export default useEventProperties