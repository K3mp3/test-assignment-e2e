import { IOmdbResponse } from "../models/IOmdbResponse";
import { IMovie } from "../models/Movie";
import axios from "axios";

export const getData = async (searchText: string): Promise<IMovie[]> => {
  return axios
    .get<IOmdbResponse>("http://omdbapi.com/?apikey=efad8a03&s=" + searchText)
    .then((data) => {
      console.log(data);
      console.log(data.data.Search);
      return data.data.Search;
    })
    .catch(() => {
      return [];
    });
};
