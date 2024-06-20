import { axiosInstance } from "../../../shared/api";
import { IShortGame } from "../../../shared/types";

export const shortGameAPI = {
  getSortedDataByShortGame: async (): Promise<IShortGame> => {
    const { data } = await axiosInstance.get('short_game');
    return data;
  },
  selectShortGameCoin: async ({ coin_id }: { coin_id: string }) => {
    const { data } = await axiosInstance.post('short_game', { coin_id });
    return data;
  },
};
