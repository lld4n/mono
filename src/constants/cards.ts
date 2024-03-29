import { CardListType } from "@/types/card/CardListType";
import arrow_jail from "../assets/emojis/arrow_jail.svg";
import train_bottom from "../assets/emojis/train_bottom.svg";
import train_left from "../assets/emojis/train_left.svg";
import train_right from "../assets/emojis/train_right.svg";
import train_top from "../assets/emojis/train_top.svg";
import banknote from "../assets/emojis/banknote.svg";
import basketball from "../assets/emojis/basketball.svg";
import football from "../assets/emojis/football.svg";
import new_moon from "../assets/emojis/new_moon.svg";
import tennis from "../assets/emojis/tennis.svg";
import apple from "../assets/emojis/apple.svg";
import arrow_left from "../assets/emojis/arrow_left.svg";
import full_moon from "../assets/emojis/full_moon.svg";
import parking from "../assets/emojis/parking.svg";
import pear from "../assets/emojis/pear.svg";
import watermelon from "../assets/emojis/watermelon.svg";
import dolphin from "../assets/emojis/dolphin.svg";
import fish from "../assets/emojis/fish.svg";
import pizza from "../assets/emojis/pizza.svg";
import police from "../assets/emojis/police.svg";
import water from "../assets/emojis/water.svg";
import whale from "../assets/emojis/whale.svg";
import cactus from "../assets/emojis/cactus.svg";
import cake from "../assets/emojis/cake.svg";
import carrot from "../assets/emojis/carrot.svg";
import deciduous_tree from "../assets/emojis/deciduous_tree.svg";
import evergeen_tree from "../assets/emojis/evergeen_tree.svg";
import hamburger from "../assets/emojis/hamburger.svg";
import hotdog from "../assets/emojis/hotdog.svg";
import lollipop from "../assets/emojis/lollipop.svg";
import cookie from "../assets/emojis/cookie.svg";
import pepper from "../assets/emojis/pepper.svg";
import voltage from "../assets/emojis/voltage.svg";
import clover from "../assets/emojis/clover.svg";

export const cardsList: CardListType[] = [
  {
    svg: arrow_left,
    name: "Старт",
    desc: "Проходя через эту ячейку вы получаете 1000 ✦",
    class: "empty",
    index: 0,
  },
  {
    svg: new_moon,
    name: "Новая луна",
    desc: "Рента зависит от количества зданий, купленных владельцем. Мы не видим луну, когда она находится в этой фазе",
    class: "street",
    index: 1,
    buy: 600,
    build: 500,
    group: [1, 3],
    unlock: 360,
    rent: [20, 100, 300, 900, 1600, 2500],
  },
  {
    svg: clover,
    name: "Шанс",
    desc: "Вам дается выбор одной из четырех карточек. Может выпасть все что угодно",
    class: "lucky",
    index: 2,
  },
  {
    svg: full_moon,
    name: "Полная луна",
    desc: "Рента зависит от количества зданий, купленных владельцем. Эта фаза луны, при которой оборотни превращаются в волков",
    class: "street",
    index: 3,
    buy: 600,
    unlock: 360,
    build: 500,
    rent: [40, 200, 600, 1800, 3200, 4500],
    group: [1, 3],
  },
  {
    svg: banknote,
    name: "Мини-налог",
    desc: "При попадании на эту ячейку вы обязаны заплатить 1000 ✦",
    class: "tax",
    index: 4,
    pay: 1000,
  },
  {
    svg: train_top,
    name: "Верхний поезд",
    desc: "Рента зависит от количества купленных поездов. Спонсорами этого поезда являются богатые члена общества",
    class: "train",
    index: 5,
    buy: 2000,
    unlock: 1200,
    rent: [1000, 2000, 4000, 8000],
    group: [5, 15, 25, 35],
  },
  {
    svg: basketball,
    name: "Баскетбол",
    desc: "Рента зависит от количества зданий, купленных владельцем. Голден Стэйт Уорриорз чемпионы (2021/22 год)",
    class: "street",
    index: 6,
    buy: 1000,
    unlock: 600,
    build: 500,
    group: [6, 8, 9],
    rent: [60, 300, 900, 2700, 4000, 5500],
  },
  {
    svg: clover,
    name: "Шанс",
    desc: "Вам дается выбор одной из четырех карточек. Может выпасть все что угодно",
    class: "lucky",
    index: 7,
  },
  {
    svg: football,
    name: "Футбол",
    desc: "Рента зависит от количества зданий, купленных владельцем. А что об этом думает Месси?",
    class: "street",
    index: 8,
    buy: 1000,
    unlock: 600,
    build: 500,
    group: [6, 8, 9],
    rent: [60, 300, 900, 2700, 4000, 5500],
  },
  {
    svg: tennis,
    name: "Большой теннис",
    desc: "Рента зависит от количества зданий, купленных владельцем. Здесь можно играть 11 часов и 5 минут (турнир Уимблдон 2010 год)",
    class: "street",
    index: 9,
    buy: 1000,
    unlock: 600,
    build: 500,
    group: [6, 8, 9],
    rent: [80, 400, 1000, 3000, 4500, 6000],
  },
  {
    svg: arrow_jail,
    name: "Тюрьма",
    desc: "Если вы не тюрьме, то вам не о чем беспокоиться. Но если вы в тюрьме, то у вас есть два способа выбраться. Во-первых, это заплатить 1000 ✦. А во-вторых, можете попробовать выбить дубль. Дается три попытки. Если попытки оказались не успешными, то вы обязаны заплатить 1000 ✦",
    class: "empty",
    index: 10,
  },
  {
    svg: cookie,
    name: "Печенье",
    desc: "Рента зависит от количества зданий, купленных владельцем. Мы используем cookie, чтобы сделать сайт максимально удобным для вас",
    class: "street",
    index: 11,
    buy: 1400,
    unlock: 840,
    build: 750,
    group: [11, 13, 14],
    rent: [100, 500, 1500, 4500, 6250, 7500],
  },
  {
    svg: voltage,
    name: "Электричество",
    desc: "Рента зависит от броска кубика и от количества купленных ячеек одной группы. Ежегодно в России потребляется около одного триллиона кВт в час (Википедия)",
    class: "nature",
    index: 12,
    buy: 1500,
    unlock: 900,
    rent: [200, 400],
    group: [12, 28],
  },
  {
    svg: lollipop,
    name: "Леденец",
    desc: "Рента зависит от количества зданий, купленных владельцем. Кариес передает привет",
    class: "street",
    index: 13,
    buy: 1400,
    unlock: 840,
    build: 750,
    group: [11, 13, 14],
    rent: [100, 500, 1500, 4500, 6250, 7500],
  },
  {
    svg: cake,
    name: "Торт",
    desc: "Рента зависит от количества зданий, купленных владельцем. Угадай, где торт",
    class: "street",
    index: 14,
    buy: 1600,
    unlock: 960,
    build: 750,
    group: [11, 13, 14],
    rent: [120, 600, 1800, 5000, 7000, 9000],
  },
  {
    svg: train_right,
    name: "Правый поезд",
    desc: "Рента зависит от количества купленных поездов. Спонсорами этого поезда являются консерваторы",
    class: "train",
    index: 15,
    buy: 2000,
    unlock: 1200,
    rent: [1000, 2000, 4000, 8000],
    group: [5, 15, 25, 35],
  },
  {
    svg: hamburger,
    name: "Гамбургер",
    desc: "Рента зависит от количества зданий, купленных владельцем. Вкусно и точка.",
    class: "street",
    index: 16,
    buy: 1800,
    unlock: 1080,
    build: 1000,
    group: [16, 18, 19],
    rent: [140, 700, 2000, 5500, 7500, 9500],
  },
  {
    svg: clover,
    name: "Шанс",
    desc: "Вам дается выбор одной из четырех карточек. Может выпасть все что угодно",
    class: "lucky",
    index: 17,
  },
  {
    svg: hotdog,
    name: "Хот-дог",
    desc: "Рента зависит от количества зданий, купленных владельцем. 8956 (хотдожная Обломова)",
    class: "street",
    index: 18,
    buy: 1800,
    unlock: 1080,
    build: 1000,
    group: [16, 18, 19],
    rent: [140, 700, 2000, 5500, 7500, 9500],
  },
  {
    svg: pizza,
    name: "Пицца",
    desc: "Рента зависит от количества зданий, купленных владельцем. Есть то, что нас объединяет (Слоган ДоДо пиццы)",
    class: "street",
    index: 19,
    buy: 2000,
    unlock: 1200,
    build: 1000,
    group: [16, 18, 19],
    rent: [160, 800, 2200, 6000, 8000, 10000],
  },
  {
    svg: parking,
    name: "Парковка",
    desc: "Ничего не происходит. Парковка на 20 000 мест расположена возле торгового центра West Edmonton Mall в Канаде (Книга рекордов Гиннеса)",
    class: "empty",
    index: 20,
  },
  {
    svg: pear,
    name: "Груша",
    desc: "Рента зависит от количества зданий, купленных владельцем. 3000 лет люди выращивали груши",
    class: "street",
    index: 21,
    buy: 2200,
    unlock: 1320,
    build: 1250,
    group: [21, 23, 24],
    rent: [180, 900, 2500, 7000, 8750, 10500],
  },
  {
    svg: clover,
    name: "Шанс",
    desc: "Вам дается выбор одной из четырех карточек. Может выпасть все что угодно",
    class: "lucky",
    index: 22,
  },
  {
    svg: apple,
    name: "Яблоко",
    desc: "Рента зависит от количества зданий, купленных владельцем. It is revolution, Johny",
    class: "street",
    index: 23,
    buy: 2200,
    unlock: 1320,
    build: 1250,
    group: [21, 23, 24],
    rent: [180, 900, 2500, 7000, 8750, 10500],
  },
  {
    svg: watermelon,
    name: "Арбуз",
    desc: "Рента зависит от количества зданий, купленных владельцем. Гуглим 'арбуз ягода или нет' и получаем 'не ягода, а кокос'",
    class: "street",
    index: 24,
    buy: 2400,
    unlock: 1440,
    build: 1250,
    group: [21, 23, 24],
    rent: [200, 1000, 3000, 7500, 9250, 11000],
  },
  {
    svg: train_bottom,
    name: "Нижний поезд",
    desc: "Рента зависит от количества купленных поездов. Спонсорами этого поезда являются бедные граждане",
    class: "train",
    index: 25,
    buy: 2000,
    unlock: 1200,
    rent: [1000, 2000, 4000, 8000],
    group: [5, 15, 25, 35],
  },
  {
    svg: whale,
    name: "Кит",
    desc: "Рента зависит от количества зданий, купленных владельцем. Сердце синего кита может весить 600 килограмм",
    class: "street",
    index: 26,
    buy: 2600,
    unlock: 1560,
    build: 1500,
    group: [26, 27, 29],
    rent: [220, 1100, 3300, 8000, 9750, 11500],
  },
  {
    svg: fish,
    name: "Рыба",
    desc: "Рента зависит от количества зданий, купленных владельцем. Существует рыба, которая не умеет плавать (Анциструс Обыкновенный)",
    class: "street",
    index: 27,
    buy: 2600,
    unlock: 1560,
    build: 1500,
    group: [26, 27, 29],
    rent: [220, 1100, 3300, 8000, 9750, 11500],
  },
  {
    svg: water,
    name: "Вода",
    desc: "Рента зависит от броска кубика и от количества купленных ячеек одной группы. Ежедневно один человек использует 9 кубометров воды",
    class: "nature",
    index: 28,
    buy: 1500,
    unlock: 900,
    rent: [200, 400],
    group: [12, 28],
  },
  {
    svg: dolphin,
    name: "Дельфин",
    desc: "Рента зависит от количества зданий, купленных владельцем. По развитию мозга дельфины находятся на втором месте после людей",
    class: "street",
    index: 29,
    buy: 2800,
    unlock: 1680,
    build: 1500,
    group: [26, 27, 29],
    rent: [240, 1200, 3600, 8500, 10250, 12000],
  },
  {
    svg: police,
    name: "Полиция",
    desc: "При попадании на эту ячейку вы отправляетесь в тюрьму. Почти полмиллиона человек в России отбывают тюремный срок",
    class: "jail",
    index: 30,
  },
  {
    svg: evergeen_tree,
    name: "Елка",
    desc: "Рента зависит от количества зданий, купленных владельцем. Ежегодно на новогодние праздники в России вырубается примерно 50 000 елок",
    class: "street",
    index: 31,
    buy: 3000,
    unlock: 1800,
    build: 1750,
    group: [31, 32, 34],
    rent: [260, 1300, 3900, 9000, 11000, 12750],
  },
  {
    svg: deciduous_tree,
    name: "Дерево",
    desc: "Рента зависит от количества зданий, купленных владельцем. Некоторые деревья могут прожить более 3000 лет (Секвойя)",
    class: "street",
    index: 32,
    buy: 3000,
    unlock: 1800,
    build: 1750,
    group: [31, 32, 34],
    rent: [260, 1300, 3900, 9000, 11000, 12750],
  },
  {
    svg: clover,
    name: "Шанс",
    desc: "Вам дается выбор одной из четырех карточек. Может выпасть все что угодно",
    class: "lucky",
    index: 33,
  },
  {
    svg: cactus,
    name: "Кактус",
    desc: "Рента зависит от количества зданий, купленных владельцем. Utopia (Cactus Jack Records)",
    class: "street",
    index: 34,
    buy: 3200,
    unlock: 1920,
    build: 1750,
    group: [31, 32, 34],
    rent: [280, 1500, 4500, 10000, 12000, 14000],
  },
  {
    svg: train_left,
    name: "Левый поезд",
    desc: "Рента зависит от количества купленных поездов. Спонсорами этого поезда являются либералы",
    class: "train",
    index: 35,
    buy: 2000,
    unlock: 1200,
    rent: [1000, 2000, 4000, 8000],
    group: [5, 15, 25, 35],
  },
  {
    svg: clover,
    name: "Шанс",
    desc: "Вам дается выбор одной из четырех карточек. Может выпасть все что угодно",
    class: "lucky",
    index: 36,
  },
  {
    svg: carrot,
    name: "Морковь",
    desc: "Рента зависит от количества зданий, купленных владельцем. Морковь полезна для зрения",
    class: "street",
    index: 37,
    buy: 3500,
    unlock: 2100,
    build: 2000,
    group: [37, 39],
    rent: [350, 1750, 5000, 11000, 13000, 15000],
  },
  {
    svg: banknote,
    name: "Налог",
    desc: "При попадании на эту ячейку вы обязаны заплатить 2000 ✦",
    class: "tax",
    index: 38,
    pay: 2000,
  },
  {
    svg: pepper,
    name: "Перец",
    desc: "Рента зависит от количества зданий, купленных владельцем. Острота перца может достигать одного миллиона сковилла (Бхут Джолокиа)",
    class: "street",
    index: 39,
    buy: 4000,
    unlock: 2400,
    build: 2000,
    group: [37, 39],
    rent: [500, 2000, 6000, 14000, 17000, 20000],
  },
];
