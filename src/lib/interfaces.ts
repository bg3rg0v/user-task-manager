export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoCoordinates;
}

export interface GeoCoordinates {
  lat: string;
  lng: string;
}

export type Users = User[];

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const isApiError = (error: unknown): error is Error =>
  error instanceof Error;
