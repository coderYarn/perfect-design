import React,{ memo, useEffect, useState } from "react";
interface MarkerProps {
  title: string;
  position: any;
  onClick?: any;
  activeIcon?: any;
  Icon?: any;
  isActive?: boolean;
  groups?: string;
}

export function useMarkers(props: any, map: any) {
  const [markerTemp, setMarkers] = useState<any[]>([]);
  useEffect(() => {
    let temp = [...markerTemp];
    let iconGroupsTemp: any = {};
    for (let i = 0; i < props.length; i++) {
      const { position, title, Icon, onClick, isActive, groups } =
        props[i].props;
      (iconGroupsTemp as any)[groups] = Icon;
      const marker = new AMap.Marker({
        position: [position.lng, position.lat],
        anchor: "center",
        icon: Icon,
        title: title,
        offset: new AMap.Pixel(0, 0),
      });
      marker.setExtData(groups);

      marker.on("click", (e: any) => {
        const { lat, lng } = e.target.getPosition();
        const map = marker.getMap();
        map.setZoomAndCenter(18, [lng, lat]);

        isActive &&
          useMarkerActive(temp, props[i].props, e.target, iconGroupsTemp);
        onClick(e.target);
      });
      temp.push(marker);
      setMarkers(temp);
    }
  }, [props.length]);
  map && map.add(markerTemp);
  return [markerTemp, setMarkers];
}
export function useMarkerActive(
  markers: any[],
  props: any,
  currentMarker: any,
  iconGroups: any
) {
  const { activeIcon } = props;

  markers
    .filter((child: any) => child._amap_id === currentMarker._amap_id)[0]
    .setIcon(activeIcon);
  markers
    .filter((child: any) => child._amap_id !== currentMarker._amap_id)
    .forEach((child: any) => {
      child.setIcon((iconGroups as any)[child.getExtData() as any]);
    });
}
function Marker(props: MarkerProps) {
  return null;
}
export default memo(Marker);
