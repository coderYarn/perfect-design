import React ,{
  createContext,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import   { useMarkers } from "../Marker/Index";
import MarkerView from "../Marker/MarkerView"
export const MapContext = createContext<any>(null)
interface AMapProps {
  children: any;
}

function AMapC(props: AMapProps, ref: any) {
  useImperativeHandle(ref, () => {
    return {
      map: map,
      removeMarker: removeMarker,
    };
  });
  const removeMarker = (group: string) => {
    const removeList = markers.filter(
      (marker: any) => marker.getExtData() == group
    );
    const list = markers.filter((marker: any) => marker.getExtData() !== group);
    setMarkers(list);
    map.current.remove(removeList);
  };
  const [AmapStore, setAmapStore] = useState<any>();
  const [center, setConter] = useState<any>();
  const [zoom, setZoom] = useState(0);
  useEffect(()=>{
    console.log(center);
    
  },[center])
  const map = useRef<any>();

  const container = useRef<HTMLDivElement>();
  const [markers, setMarkers]: any = useMarkers(props.children, map.current);
  useEffect(() => {
    if (container.current) {
      map.current = new AMap.Map(container.current, {
        center: [113.397694, 22.514927],
        resizeEnable: true,
        mapStyle: "amap://styles/darkblue",
        zoom: 0,
      });
      map.current.on("click", (e: any) => {});
      map.current.on("zoomend", () => {
        setConter(map.current.getCenter());
        setZoom(map.current.getZoom());
      });
      setAmapStore(map.current);
    }
  }, [container]);

  return (
    <MapContext.Provider value={{ map: AmapStore as any }}>
      <div className="App" ref={container as any} />
      <MarkerView marters={markers}></MarkerView>
    </MapContext.Provider>
  );
}

export default memo(forwardRef(AMapC));
