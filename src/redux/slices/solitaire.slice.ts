import {
  createSlice,
  createSelector,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { AppState } from "../index";
import { ISolitaireSlice, ISolitaireSliceData } from "@/interfaces/redux";
import { ACTION_TYPES, PLACES } from "@/constants/solitaire";
import { Places } from "@/interfaces/solitaire";

const POINTS = {
  [PLACES.DECK]: {
    [PLACES.PILE]: 5,
    [PLACES.FOUNDATION]: 10,
  },
  [PLACES.PILE]: {
    [PLACES.FOUNDATION]: 10,
  },
  [PLACES.FOUNDATION]: {
    [PLACES.PILE]: -15,
  },
} as const;

const initialData: ISolitaireSlice = {
  data: {
    game: {

    },
    score: 0,
  },
  status: "idle",
  error: null,
};

const getPoints = (points: any) => (source: any, target: any) =>
  (points[source][target] !== undefined && points[source][target]) || 0;

function handleCardMove(state: any, action: any) {
  const { where } = action.payload;
  return state + getPoints(POINTS)(where.from, where.to);
}

export const solitaireSlice = createSlice({
  name: "solitaire",
  initialState: initialData,
  reducers: {
    moveCard(state, action){
      state.data.score = handleCardMove(state as any, action);
    }
  },
});

// Function to select solitaire slice root state
const selectSolitaireRootState = (state: AppState): ISolitaireSlice =>
  state.solitaire;

export const getSolitaireGame = createSelector<
  [(state: AppState) => ISolitaireSlice],
  { [key: string]: any }
>(
  [selectSolitaireRootState],
  (solitaireState) => solitaireState?.data?.game || {}
);

export const getSolitaireScore = createSelector<
  [(state: AppState) => ISolitaireSlice],
  { [key: string]: any }
>(
  [selectSolitaireRootState],
  (solitaireState) => solitaireState?.data?.score || {}
);

export const { moveCard } = solitaireSlice.actions;
export default solitaireSlice.reducer;
