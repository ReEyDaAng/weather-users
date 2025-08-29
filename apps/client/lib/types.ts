// apps/client/lib/types.ts
export interface RandomUserName { title: string; first: string; last: string }
export interface RandomUserLocationCoords { latitude: string; longitude: string }
export interface RandomUserLocation { city: string; country: string; coordinates: RandomUserLocationCoords }
export interface RandomUserPicture { large: string; medium: string; thumbnail: string }
export interface RandomUser {
  gender: "male" | "female";
  name: RandomUserName;
  location: RandomUserLocation;
  email: string;
  picture: RandomUserPicture;
  login: { uuid: string };
}

export interface UsersApiResponse {
  results: RandomUser[];
  info: { seed: string; results: number; page: number };
}

export interface SavedUser {
  id: string;          // login.uuid
  payload: RandomUser; // збережений JSON користувача
  created_at?: string;
}
