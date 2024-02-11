import styles from "@/styles/tile.module.css";
import { Tile as TileProps } from "@/models/tile";
import { containerWidth, tileCountPerDimesion } from "@/constants";

export default function Tile({ position, value }: TileProps) {
  const positionToPixels = (position: number) => {
    // 0: (0 / 4) * 288 = 0px
    // 1: (1 / 4) * 288 = 72px
    return (position / tileCountPerDimesion) * containerWidth
  }
  const style = {
    left: positionToPixels(position[0]),
    top: positionToPixels(position[1])
   }
  return <div className={styles.tile} style={style}>{value}</div>;
}
