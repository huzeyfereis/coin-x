import axios from 'axios';
import { IResultItem } from '../features/coinsListSlice';

export interface ICoinsListResponse {
  '24hVolume': string;
  btcPrice: string;
  change: string;
  coinrankingUrl: string;
  color: string;
  iconUrl: string;
  listedAt: number;
  lowVolume: boolean;
  marketCap: string;
  name: string;
  price: string;
  rank: number;
  sparkline: string[];
  symbol: string;
  tier: number;
  uuid: string;
}

class HomepageService {
  private baseUrl = 'https://coinranking1.p.rapidapi.com';
  getAllCoins = async () => {
    return axios
      .get(`${this.baseUrl}/coins`, {
        headers: {
          'X-RapidAPI-Key':
            '094fb5e856mshb13a44c44398469p1f0e2fjsn07706f015321',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
        },
      })
      .then((response) => {
        const result: IResultItem[] = response.data.data.coins.map(
          (item: ICoinsListResponse) => ({
            uuid: item.uuid,
            name: item.name,
            rank: item.rank,
            symbol: item.symbol,
            iconUrl: item.iconUrl,
            price: item.price,
            marketCap: item.marketCap,
            change: item.change,
          })
        );
        return result;
      })
      .catch((err) => console.error(err));
  };
}

const HomePage = new HomepageService();
export default HomePage;
