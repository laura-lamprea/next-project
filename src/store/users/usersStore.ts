import { create } from 'zustand';
import axios, { endpoints } from 'src/utils/axios';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UsersStore {
  users: User[];
  addUser: (user: User) => void;
}

export const useUsersStore = create<UsersStore>((set) => ({
  users: [],
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
}));


export const fetchUsers = async () => {
  try {
    const response = await axios.get(endpoints.user.list);
    return response.data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};