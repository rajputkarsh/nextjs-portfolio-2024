interface IBaseSlice<T> {
  data: T;
  status: string;
  error: Error | Object | null | string;
}

export interface ISolitaireSliceData {
  game: {
    [key: string]: any;
  };
  score: Number;
}
export interface ISolitaireSlice extends IBaseSlice<ISolitaireSliceData> {}