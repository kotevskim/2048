import { tileCountPerDimesion } from "@/constants";
import { Tile, TileMap } from "@/models/tile";
import { isNil } from "lodash";
import { uid } from "uid";

type State = {
  board: string[][];
  tiles: TileMap;
};
type Action = { type: "CreateTile"; tile: Tile } | { type: "MoveUp" } | { type: "MoveDown" };

function createBoard() {
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
    case "MoveUp": {
      const newBoard = createBoard();
      const newTiles: TileMap = {};
      for (let x = 0; x < tileCountPerDimesion; x++) {
        let newY = 0;
        for (let y = 0; y < tileCountPerDimesion; y++) {
          const tileId = state.board[y][x];
          if (!isNil(tileId)) {
            newBoard[newY][x] = tileId;
            newTiles[tileId] = {
              ...state.tiles[tileId],
              position: [x, newY],
            };
            newY++;
          }
        }
      }
      return {
        ...state,
        board: newBoard,
        tiles: newTiles,
      };
    }
    case "MoveDown": {
      const newBoard = createBoard();
      const newTiles: TileMap = {};
      for (let x = 0; x < tileCountPerDimesion; x++) {
        let newY = tileCountPerDimesion - 1;
        for (let y = 0; y < tileCountPerDimesion; y++) {
          const tileId = state.board[y][x];
          if (!isNil(tileId)) {
            newBoard[newY][x] = tileId;
            newTiles[tileId] = {
              ...state.tiles[tileId],
              position: [x, newY],
            };
            newY--;
          }
        }
      }
      return {
        ...state,
        board: newBoard,
        tiles: newTiles,
      };
    }
    default:
      return state;
  }
}
