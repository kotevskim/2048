import styles from "@/styles/board.module.css";
import Tile from "./tile";
import { KeyboardEvent, useEffect, useReducer, useRef } from "react";
import gameReducer, { initialState } from "@/reducers/game-reducer";
import { Tile as TileModel } from "@/models/tile";

export default function Board() {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  const initialized = useRef(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault(); // so that the keyboard arrows don't scroll the page
    switch (e.code) {
      case "ArrowUp":
        dispatch({ type: "MoveUp" });
        break;
      case "ArrowDown":
        dispatch({ type: "MoveDown" });
        break;
      case "ArrowLeft":
        dispatch({ type: "MoveLeft" });
        break;
      case "ArrowRight":
        dispatch({ type: "MoveRight" });
        break;
    }
  };

  const renderGrid = () => {
    const cells: JSX.Element[] = [];
    const cellsCount = 16;
    for (let index = 0; index < cellsCount; index += 1) {
      cells.push(<div className={styles.cell} key={index}></div>);
    }
    return cells;
  };

  useEffect(() => {
    if (initialized.current == false) {
      dispatch({ type: "CreateTile", tile: { position: [1, 1], value: 2 } });
      dispatch({ type: "CreateTile", tile: { position: [1, 2], value: 2 } });
      dispatch({ type: "CreateTile", tile: { position: [1, 3], value: 4 } });
      initialized.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const renderTiles = () => {
    return Object.values(gameState.tiles).map((tile: TileModel, index: number) => {
      return <Tile key={`${index}`} {...tile} />;
    });
  };

  return (
    <div className={styles.board}>
      <div className={styles.tiles}>{renderTiles()}</div>
      <div className={styles.grid}>{renderGrid()}</div>
    </div>
  );
}
