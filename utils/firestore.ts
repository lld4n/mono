import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from '@firebase/firestore';
import { db } from './firebase';

/**
 * Класс отвечающий за работу с Firebase Firestore
 */
export default class fstore {
  /**
   * Добавить документ в коллекцию со своим названием
   */
  static async set(collectionName: string, documentName: string, data: any) {
    await setDoc(doc(db, collectionName, documentName), data);
  }

  /**
   * Добавить документ в коллекцию со сгенерированным названием
   */
  static async add(collectionName: string, data: any) {
    await addDoc(collection(db, collectionName), data);
  }

  /**
   * Удалить документ из коллекции
   */
  static async delete(collectionName: string, documentName: string) {
    await deleteDoc(doc(db, collectionName, documentName));
  }

  /**
   * Получить данные документа из коллекции НЕ в реальном времени
   */
  static async get(collectionName: string, documentName: string) {
    const docSnap = await getDoc(doc(db, collectionName, documentName));
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }
}
