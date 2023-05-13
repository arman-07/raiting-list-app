import axios from "axios";

import { User } from '../types/index'

export async function getUsers(): Promise<User[]> {
  try {
    const response = await axios.get("https://random-data-api.com/api/users/random_user?size=3");
    
    return response.data.map((user: any) => ({
      id: user.id,
      name: user.username,
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}
