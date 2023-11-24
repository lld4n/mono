import { gameType } from '../types/gameType';
import { cardsList, cardsTypeEnum } from '../assets/cards';

export function getFullBalance(email: string, game: gameType): number {
  let answer = 0;
  answer += game.players[email].balance || 0;
  for (let i = 0; i < game.cards.length; i++) {
    if (game.cards[i].owner_email === email) {
      if (cardsList[i].type === cardsTypeEnum.STREET) {
        answer += cardsList[i].prices?.[2] || 0;
        const status = game.cards[i].status;
        if (status === 5) {
          answer += (cardsList[i].prices?.[0] || 0) * 4;
          answer += cardsList[i].prices?.[1] || 0;
        } else if (status !== null && status > 0) {
          for (let i = 1; i <= status; i++) {
            answer += cardsList[i].prices?.[0] || 0;
          }
        }
      } else {
        answer += cardsList[i].prices?.[2] || 0;
      }
    }
  }

  return answer;
}
