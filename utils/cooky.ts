import {
  deleteCookie,
  getCookie,
  getCookies,
  hasCookie,
  setCookie,
} from 'cookies-next';
import { TmpCookiesObj } from 'cookies-next/lib/types';

/**
 * Класс для работы с куки. Назван cooky, чтобы избавить от пересечений с cookie
 */
export default class cooky {
  /**
   * Проверяет наличие куки по ключу
   */
  static has(key: string): boolean {
    return hasCookie(key);
  }

  /**
   * Получение всех куки
   */
  static getAll(): TmpCookiesObj {
    return getCookies();
  }

  /**
   * Возвращает куки по ключу
   */
  static get(key: string): string | undefined {
    return getCookie(key);
  }

  /**
   * Добавляет куки по ключу. Дата может быть любой, она превращается в строку с помощью JSON.stringify или просто с помощью String()
   */
  static set(key: string, data: any): void {
    setCookie(key, data, {
      maxAge: 24 * 30 * 24 * 60 * 60,
    });
  }

  /**
   * Удаляет куки по ключу
   */
  static remove(key: string): void {
    deleteCookie(key);
  }
}
