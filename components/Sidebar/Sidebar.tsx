import styles from './Sidebar.module.scss';
import { gamePlayersType, gameType } from '../../types/gameType';
import { characters } from '../../assets/characters';

export default function Sidebar({ players }: { players: gamePlayersType }) {
  return (
    <div>
      {Object.keys(players).map((player, index) => (
        <div key={index} className={styles['player']}>
          <div className={styles['player__balance']}>
            {players[player].balance}
          </div>
          <div
            className={styles['player__name']}
            style={{
              backgroundColor:
                characters[players[player].selected_character].color,
              color: characters[players[player].selected_character].opposite,
            }}
          >
            {players[player].display_name}
          </div>
        </div>
      ))}
    </div>
  );
}
