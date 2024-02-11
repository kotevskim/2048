import styles from "@/styles/board.module.css";
import Tile from "./tile";

export default function Board() {
  const renderGrid = () => {
    const cells: JSX.Element[] = [];
    const cellsCount = 16;
    for (let index = 0; index < cellsCount; index += 1) {
      cells.push(<div className={styles.cell} key={index}></div>);
    }
    return cells;
  };

  return (
    <div className={styles.board}>
      <div className={styles.tiles}>
        <Tile />
      </div>
      <div className={styles.grid}>{renderGrid()}</div>
    </div>
  );
}
