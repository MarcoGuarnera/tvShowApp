export interface Show {
  id: number;
  name: string;
  language: string;
  genres: string[];
  status: string;
  premiered: string;
  ended?: string;
  rating: Rating;
  image: Image;
  summary: string;
}

export interface Rating {
  average?: number;
}

export interface Image {
  medium: string;
  original: string;
}
