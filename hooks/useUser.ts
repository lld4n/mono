import { userType } from '../types/userType';
import cooky from '../utils/cooky';

export default function useUser(): userType | null {
  const user = cooky.get('user_mono');

  if (user) {
    return JSON.parse(user) as userType;
  } else {
    return null;
  }
}
