export interface CardMyListProps {
  dataMovie: {
    id: number;
    poster_path: string | null;
    title: string;
    runtime: number;
    genres: { id: number; name: string }[];
    vote_average: number;
  };
  getMyList: () => Promise<void>;
}
