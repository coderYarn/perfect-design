import { useState, useMemo, useEffect, useContext } from 'react';


import { MapProps } from './Map';
import { Context } from './context';
export function useSetStatus<T extends { getStatus: () => any; setStatus: (opt: any) => void }, F = {}>(
    instance: T,
    props = {} as F,
    propsName: string[] = [],
  ) {
    propsName.forEach((name) => {
      const eName = name as keyof F;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [state, setState] = useState(props[eName]);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        if (instance && props[eName] !== undefined) {
          if (props[eName] !== state) {
            // map.setStatus({
            //   dragEnable: true,
            //   keyboardEnable: true,
            //   doubleClickZoom: true,
            //   zoomEnable: true,
            //   rotateEnable: true
            // });
            const status = instance.getStatus();
            instance.setStatus({ ...status, [eName]: props[eName] });
            setState(props[eName]);
          }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [instance, props[eName]]);
    });
  }
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
export interface OverlayProps extends MapChildProps {}

/**
 * 此类型是 `<Map>` 组件传递给子组件(如 `<Marker>`)的两个 props
 */
export interface MapChildProps {
  /**
   * 地图API的核心类，SDK加载完成才有
   */
  AMap?: typeof AMap;
  /**
   * 实例化后的地图对象
   */
  map?: AMap.Map;
}

export interface UseMap extends MapProps, MapChildProps {
  /**
   * 指定的容器
   */
  container?: HTMLDivElement | null;
}
export function useSettingProperties<T, F = {}>(instance = {} as T, props = {} as F, propsName: string[] = []) {
    propsName.forEach((name) => {
      const eName = `set${name}` as keyof T;
      const vName = `${name.charAt(0).toLowerCase()}${name.slice(1)}` as keyof F;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [state, setState] = useState(props[vName]);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        if (instance && props[vName] !== undefined) {
          if (props[vName] !== state && instance[eName] && typeof instance[eName] === 'function') {
            (instance[eName] as any)(props[vName]);
            setState(props[vName]);
          }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [instance, props[vName]]);
    });
  }
export const useMap = (props: UseMap = {}) => {
  const { ...other } = props;
  const [map, setMap] = useState<AMap.Map>();
  const [zoom, setZoom] = useState(props.zoom || 15);
  const [container, setContainer] = useState<HTMLDivElement | null | undefined>(props.container);
  const { dispatch } = useContext(Context);
  useEffect(() => {
    if (container && !map && AMap) {
      container.className = container.className + ' react-amap-wapper';
      const instance = new AMap.Map(container, { zoom, ...other });
      setMap(instance);
    }
    return () => {
      if (map) {
        map.clearInfoWindow();
        map.clearLimitBounds();
        map.clearMap();
        map.destroy();
        setMap(undefined);
      }
    };
  }, [container, map]);

  useEffect(() => {
    if (map && container) {
      dispatch({ map, container, AMap });
    }
    return () => {
      dispatch({ map: undefined, container: undefined, AMap: undefined });
    };
  }, [map, container]);

  useMemo(() => {
    if (map && typeof props.zoom === 'number' && zoom !== props.zoom && props.zoom >= 2 && props.zoom <= 20) {
      setZoom(props.zoom);
      map.setZoom(props.zoom);
    }
  }, [zoom, props.zoom]);

  useMemo(() => {
    if (props.center && map) {
      map.setCenter(props.center);
    }
  }, [map, props.center]);

  useSetStatus<AMap.Map, UseMap>(map!, props, [
    'dragEnable',
    'zoomEnable',
    'jogEnable',
    'pitchEnable',
    'rotateEnable',
    'animateEnable',
    'keyboardEnable',
  ]);
  // setStatus, setZoomAndCenter, setFitView
  // 'Center',
  useSettingProperties<AMap.Map, UseMap>(map!, props, [
    'Zoom',
    'LabelzIndex',
    'Layers',
    'City',
    'Bounds',
    'LimitBounds',
    'Lang',
    'Rotation',
    'DefaultCursor',
    'MapStyle',
    'Features',
    'DefaultLayer',
    'Pitch',
  ]);
  useEventProperties<AMap.Map, UseMap>(map!, props, [
    'onMouseMove',
    'onZoomChange',
    'onMapMove',
    'onMouseWheel',
    'onZoomStart',
    'onMouseOver',
    'onMouseOut',
    'onDblClick',
    'onClick',
    'onZoomEnd',
    'onMoveEnd',
    'onMouseUp',
    'onMouseDown',
    'onRightClick',
    'onMoveStart',
    'onDragStart',
    'onDragging',
    'onDragEnd',
    'onHotspotOut',
    'onHotspotOver',
    'onTouchStart',
    'onComplete',
    'onHotspotClick',
    'onTouchMove',
    'onTouchEnd',
    'onResize',
  ]);
  return {
    map,
    setMap,
    zoom,
    setZoom,
    container,
    setContainer,
  };
};
