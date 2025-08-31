export type AppUser = {
  login: { uuid: string };
  name: { first: string; last: string };
  email: string;
  gender: string;
  location: {
    city: string;
    country: string;
    coordinates: { latitude: string; longitude: string };
  };
  picture: { large: string };
};

export type SavedUser = {
  id: string;
  payload: AppUser;
  created_at?: string;
};
