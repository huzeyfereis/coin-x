import axios from 'axios';

export interface ISingleCoinResponse {
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
  description: string;
}

class CoinDetailsService {
  private baseUrl = 'https://coinranking1.p.rapidapi.com';
  getSingleCoin = async (coinId: string) => {
    return axios
      .get(`${this.baseUrl}/coin/${coinId}`, {
        headers: {
          'X-RapidAPI-Key':
            '094fb5e856mshb13a44c44398469p1f0e2fjsn07706f015321',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
        },
      })
      .then((response) => {
        const {
          uuid,
          name,
          rank,
          symbol,
          iconUrl,
          price,
          marketCap,
          change,
          description,
        } = response.data.data.coin;

        const result = {
          uuid,
          name,
          rank,
          symbol,
          iconUrl,
          price,
          marketCap,
          change,
          description,
        };
        return result;
      })
      .catch((err) => console.error(err));
  };
}
const CoinDetails = new CoinDetailsService();
export default CoinDetails;
