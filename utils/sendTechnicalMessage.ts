import fstore from './firestore';
import { chatType } from '../types/chatType';

export async function sendTechnicalMessage(chat_id: string, input: string) {
  const chat: chatType = (await fstore.get('chats', chat_id)) as chatType;
  let chatBuffer = Object.assign({}, chat);
  const message = {
    text: input,
    date: new Date().getTime(),
  };
  chatBuffer.messages.push(message);
  await fstore.set('chats', chat_id, chatBuffer);
}
