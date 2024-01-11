import { getServerSession } from "next-auth";
import { authOptions } from 'src/app/api/auth/[...nextauth]/route';
import axios, { endpoints } from 'src/utils/axios';

export const getUserSessionServer = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export const signInEmailPassword = async (email: string, password: string) => {
  if (!email || !password) return null;
  const user = await axios.post(endpoints.auth.login, { email, password });  
  return user; 
}


