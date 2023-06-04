export interface User {
  firstName?: string;
  lastName?: string;
  displayName: string;
  email: string;
  avatar?: string;
  location?: string;
  favorites?: Array<string>;
  password: string;
  tokens?: Array<{ token: string }>;
}

export interface Partner {
  company: string;
  email: string;
  password: string;
  tokens?: Array<{ token: string }>;
}
