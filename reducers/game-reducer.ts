import { tileCountPerDimesion } from "@/constants";
import { Tile, TileMap } from "@/models/tile";
import { isNil } from "lodash";
import { uid } from "uid";

type State = {
  board: string[][];
  tiles: TileMap;
};
type Action =
  | { type: "CreateTile"; tile: Tile }
  | { type: "MoveUp" }
  | { type: "MoveDown" }
  | { type: "MoveLeft" }
  | { type: "MoveRight" };

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
          [tileId]: { id: tileId, ...action.tile },
        },
      };
    }
    case "MoveUp": {
      const newBoard = createBoard();
      const newTiles: TileMap = {};
      for (let column = 0; column < tileCountPerDimesion; column++) {
        let newRow = 0;
        let previousTile: Tile | undefined;

        for (let row = 0; row < tileCountPerDimesion; row++) {
          const tileId = state.board[row][column];
          const currentTile = state.tiles[tileId];

          if (!isNil(tileId)) {
            if (previousTile?.value === currentTile.value) {
              newTiles[previousTile.id as string] = {
                ...previousTile,
                value: previousTile.value * 2,
              };
              previousTile = undefined;
            } else {
              newBoard[newRow][column] = tileId;
              newTiles[tileId] = {
                ...currentTile,
                position: [column, newRow],
              };
              previousTile = newTiles[tileId];
              newRow++;
            }
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
      for (let column = 0; column < tileCountPerDimesion; column++) {
        let newRow = tileCountPerDimesion - 1;
        let previousTile: Tile | undefined;

        for (let row = 0; row < tileCountPerDimesion; row++) {
          const tileId = state.board[row][column];
          const currentTile = state.tiles[tileId];

          if (!isNil(tileId)) {
            if (previousTile?.value === currentTile.value) {
              newTiles[previousTile.id as string] = {
                ...previousTile,
                value: previousTile.value * 2,
              };
              previousTile = undefined;
            } else {
              newBoard[newRow][column] = tileId;
              newTiles[tileId] = {
                ...currentTile,
                position: [column, newRow],
              };
              previousTile = newTiles[tileId];
              newRow--;
            }
          }
        }
      }
      return {
        ...state,
        board: newBoard,
        tiles: newTiles,
      };
    }
    case "MoveLeft": {
      const newBoard = createBoard();
      const newTiles: TileMap = {};
      for (let row = 0; row < tileCountPerDimesion; row++) {
        let newColumn = 0;
        let previousTile: Tile | undefined;

        for (let column = 0; column < tileCountPerDimesion; column++) {
          const tileId = state.board[row][column];
          const currentTile = state.tiles[tileId];

          if (!isNil(tileId)) {
            if (previousTile?.value === currentTile.value) {
              newTiles[previousTile.id as string] = {
                ...previousTile,
                value: previousTile.value * 2,
              };
              previousTile = undefined;
            } else {
              newBoard[row][newColumn] = tileId;
              newTiles[tileId] = {
                ...currentTile,
                position: [newColumn, row],
              };
              previousTile = newTiles[tileId];
              newColumn++;
            }
          }
        }
      }
      return {
        ...state,
        board: newBoard,
        tiles: newTiles,
      };
    }
    case "MoveRight": {
      const newBoard = createBoard();
      const newTiles: TileMap = {};
      for (let row = 0; row < tileCountPerDimesion; row++) {
        let newColumn = tileCountPerDimesion - 1;
        let previousTile: Tile | undefined;

        for (let column = 0; column < tileCountPerDimesion; column++) {
          const tileId = state.board[row][column];
          const currentTile = state.tiles[tileId];

          if (!isNil(tileId)) {
            if (previousTile?.value === currentTile.value) {
              newTiles[previousTile.id as string] = {
                ...previousTile,
                value: previousTile.value * 2,
              };
              previousTile = undefined;
            } else {
              newBoard[row][newColumn] = tileId;
              newTiles[tileId] = {
                ...currentTile,
                position: [newColumn, row],
              };
              previousTile = newTiles[tileId];
              newColumn--;
            }
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
