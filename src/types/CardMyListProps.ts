export interface CardMyListProps {
  dataMovie: {
    poster_path: string | null;
    title: string;
    runtime: number;
    genres: { id: number; name: string }[];
  };
}
