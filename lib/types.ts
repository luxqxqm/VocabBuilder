export interface Word {
  _id: string;
  en: string;
  ua: string;
  category: string;
  isIrregular?: boolean;
  progress?: number;
}

export interface WordsResponse {
  results: Word[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface WordsFilters {
  keyword: string;
  category: string;
  isIrregular?: boolean;
  page: number;
}

export interface WordPayload {
  en: string;
  ua: string;
  category: string;
  isIrregular?: boolean;
}

export interface Task {
  _id: string;
  en?: string;
  ua?: string;
  task: "en" | "ua";
}

export interface Answer {
  _id: string;
  en: string;
  ua: string;
  task: "en" | "ua";
  isDone?: boolean;
}

export interface AuthUser {
  name: string;
  email: string;
}

export interface AuthResponse extends AuthUser {
  token: string;
}
