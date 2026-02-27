'use server';

import { safeFetch } from '@/lib/safeFetch';
import {
  GetAllUsers,
  GetAllUsersSchema,
  GetUserSchema,
  User,
} from '@/types/user.type';

/**
 * Get all users
 * @returns GetAllUsers
 */
export const getAllUsers = async (): Promise<GetAllUsers | null> => {
  const [isError, data] = await safeFetch(GetAllUsersSchema, '/users', {
    cache: 'no-store',
  });
  if (isError || !data)
    return {
      data: [],
    };
  return data;
};

/**
 * Get user by identifier (Email or Username)
 * @param identifier
 * @returns User | null
 */
export const getUser = async (identifier: string): Promise<User | null> => {
  const [error, data] = await safeFetch(GetUserSchema, `/users/${identifier}`, {
    cache: 'no-store',
  });
  if (error || !data) {
    console.log('Get user error', error);
    return null;
  }
  return data.data;
};
