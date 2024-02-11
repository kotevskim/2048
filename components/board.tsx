import styles from "@/styles/board.module.css";
import Tile from "./tile";
import { useEffect, useReducer, useRef } from "react";
import gameReducer, { initialState } from "@/reducers/game-reducer";
import { Tile as TileModel } from "@/models/tile"

export default function Board() {
  const [gameState, dispatch] = useReducer(gameReducer, initialState)
  const intialized = useRef(false);

  const renderGrid = () => {
    const cells: JSX.Element[] = [];
    const cellsCount = 16;
    for (let index = 0; index < cellsCount; index += 1) {
      cells.push(<div className={styles.cell} key={index}></div>);
    }
    return cells;
  };

  useEffect(() => {
    if (intialized.current == false) {
      dispatch({ type: "CreateTile", tile: { position: [0, 1], value: 2 } })
      dispatch({ type: "CreateTile", tile: { position: [0, 2], value: 2 } })
      intialized.current = true
    }
  }, [])

  const renderTiles = () => {
    return Object.values(gameState.tiles).map((tile: TileModel, index: number) => {
      return <Tile key={`${index}`} {...tile} />
    })
  }

  return (
    <div className={styles.board}>
      <div className={styles.tiles}>
        {renderTiles()}
      </div>
      <div className={styles.grid}>{renderGrid()}</div>
    </div>
  );
}
