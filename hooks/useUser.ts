'use client';
import { userType } from '../types/userType';
import cooky from '../utils/cooky';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

/**
 * Кастомный хук для получения юзера userType
 * Если произойдет ошибка, пользователь будет выкинут в стартовую страницу
 * ts-ignore не ошибка, так как router.push не блокирует дальнейшие действия
 * @param router принимает useRouter
 */
// @ts-ignore
export default function useUser(router: AppRouterInstance): userType {
  const user = cooky.get('user_mono');

  if (user) {
    return JSON.parse(user) as userType;
  } else {
    router.push('/');
  }
}
