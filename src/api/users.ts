import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUserById = (userId: number): Promise<Post[]> => {
  return client.get(`/users/${userId}`);
};

export const getAllUsers = (): Promise<User[]> => {
  return client.get(`/users`);
};
