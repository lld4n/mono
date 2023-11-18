import { InternationalizationType } from '../types/i18n';

const ru: InternationalizationType = {
  root: {
    rules: 'Правила',
    google: 'Войти с Google',
    join: 'Войти в комнату',
    create: 'Создать комнату',
    open: 'Открытые комнаты',
    exit: 'Выйти',
  },
  room: {
    title: 'Начать игру',
    subtitle:
      'Пригласи еще участников. Для этого скопируй код выше и отправь друзьям',
    character: 'Выберите персонажа за которого будете играть',
    toggle: 'Сейчас комната',
    private: 'приватная',
    public: 'публичная',
  },
  input: 'Введите сообщение',
  copy: 'Скопировано',
  joinRoom: {
    keyInput: 'Вставьте уникальный ключ от комнаты',
  },
  connect: 'Присоединиться',
};

export default ru;
