export interface LoginData {
  username: string;
  password: string;
}

export interface Movie {
  id: number;
  title: string;
  genere: string;
  year: number;
}

export interface CreateMovieModalProps {
  show: boolean;
  onClose: () => void;
  onCreate: (movie: Movie) => void;
  movie: Movie;
  setMovie: React.Dispatch<React.SetStateAction<Movie>>;
}

export interface EditMovieModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (movie: Movie) => void;
  movie: Movie;
  setMovie: React.Dispatch<React.SetStateAction<Movie>>;
}
