import { UserData } from "./UserData";

export type CardMyListProps = {
  dataMovie: {
    id: number;
    poster_path: string | null;
    title: string;
    runtime: number;
    genres: { id: number; name: string }[];
    vote_average: number;
  };
  getDataUser: (user: UserData) => void;
};
