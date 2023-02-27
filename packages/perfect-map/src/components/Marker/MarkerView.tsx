import React,{ useContext, useEffect } from "react";
import { MapContext } from "../Map/Index";
interface MarkerViewProps {
  marters: any[];
}

function MarkerView(props: MarkerViewProps) {
  const { map } = useContext(MapContext);
  const { marters } = props;
  useEffect(() => {
    if (map) {
      map.add(marters);
    }
  }, [map]);
  return null;
}
export default MarkerView;
