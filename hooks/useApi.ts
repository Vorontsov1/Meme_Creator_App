import { memes } from '../assets/list';
import trending from '../assets/trending.json';
import axios from 'axios';



export interface TrendingMeme {
    id: string
    url: string
    created_utc: number
} 

export interface Meme { 
    name: string
    image: any
}


export const useApi = () => {
  const getTrending = async (): Promise<TrendingMeme[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(trending);
      }, 1000);
    });
  };
  
  const getMemes = async (): Promise<Meme[]> => {
    return new Promise((resolve, reject) => {
      let result: Meme[] = [];

      Object.entries(memes).forEach(([key, value]) => {
        result.push({
          name: key,
          image: value,
        });
      });
      resolve(result);
    });
  };

   const createMeme = async (top: string, bottom: string, meme: string): Promise<any>  =>  {
  return axios.get(`https://ronreiter-meme-generator.p.rapidapi.com/meme`, {
    params: { top, bottom, meme },
    headers: {
      "X-RapidAPI-Key": "34921121damsh76adfda07b9a188p15ff7djsn76e27044a36e",
      "X-RapidAPI-Host": "ronreiter-meme-generator.p.rapidapi.com",
    },
    responseType: "blob",
  });
}

  return {
    getTrending,
    getMemes,
    createMeme
  };
}