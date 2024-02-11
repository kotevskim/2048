import { Tile } from "@/models/tile";
import { uid } from "uid";

type State = {
  board: string[][];
  tiles: { [id: string]: Tile };
};
type Action = { type: "CreateTile"; tile: Tile };

function createBoard(tileCountPerDimesion: number = 4) {
  const board: string[][] = [];
  for (let i = 0; i < tileCountPerDimesion; i += 1) {
    board[i] = new Array(tileCountPerDimesion).fill(undefined);
  }
  return board;
}

export const initialState: State = {
  board: createBoard(),
  tiles: {},
};

export default function gameReducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case "CreateTile": {
      const tileId = uid();
      const [x, y] = action.tile.position;
      const newBoard = JSON.parse(JSON.stringify(state.board));
      newBoard[y][x] = tileId;
      return {
        ...state,
        board: newBoard,
        tiles: {
          ...state.tiles,
          [tileId]: action.tile,
        },
      };
    }
    default:
      return state;
  }
}
