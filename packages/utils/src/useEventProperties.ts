import { useEffect } from "react";
      // eslint-disable-next-line react-hooks/rules-of-hooks
export function useEventProperties<T extends AMap.MapEventListener<any>, F>(
    instance: T,
    props = {} as F,
    eventName: string[] = [],
    type?: any,
  ) {
    eventName.forEach((name) => {
      const eventName = name as keyof F;
      const eventHandle = props[eventName];
      // eslint-disable-next-line react-hooks/rules-of-hooks
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [instance, props[eventName]]);
    });
  }

  export default useEventProperties