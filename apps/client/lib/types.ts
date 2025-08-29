// apps/client/lib/types.ts
export type AppUser = {
  login: { uuid: string };
  name: { first: string; last: string };
  email: string;
  gender: 'male' | 'female';
  picture: { large: string; medium: string; thumbnail: string };
  location: {
    city: string;
    country: string;
    coordinates: { latitude: string; longitude: string };
  };
};

export type UsersApiResponse = {
  results: AppUser[];
  info: { seed: string; results: number; page: number };
};

export type SavedUser = {
  id: string;            // login.uuid
  payload: AppUser;         // збережений JSON
  created_at?: string;
};
