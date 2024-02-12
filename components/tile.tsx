import styles from "@/styles/tile.module.css";
import { Tile as TileProps } from "@/models/tile";
import { containerWidth, mergeAnimationDuration, tileCountPerDimesion } from "@/constants";
import { useEffect, useState } from "react";
import usePreviousProps from "@/hooks/use-previous-props";

export default function Tile({ position, value }: TileProps) {
  const [scale, setScale] = useState(1);
  const previousValue = usePreviousProps(value);
  const hasChanged = previousValue != value;

  useEffect(() => {
    if (hasChanged) {
      setScale(1.1);
      setTimeout(() => setScale(1), mergeAnimationDuration);
    }
  }, [hasChanged]); // trigger useEffect only when the the value is changing

  const positionToPixels = (position: number) => {
    // 0: (0 / 4) * 288 = 0px
    // 1: (1 / 4) * 288 = 72px
    return (position / tileCountPerDimesion) * containerWidth;
  };
  const style = {
    left: positionToPixels(position[0]),
    top: positionToPixels(position[1]),
    transform: `scale(${scale})`,
  };
  return (
    <div className={styles.tile} style={style}>
      {value}
    </div>
  );
}
