"use client";
import { PlayersGetType } from "@/types/PlayersGetType";
import { Doc } from "../../../../convex/_generated/dataModel";
import { CardsGetType } from "@/types/CardsGetType";
import React from "react";
import { cardsList } from "@/constants/cards";
import styles from "./GameBoardCardInfo.module.scss";
import {
  Eye,
  EyeOff,
  X,
  Lock,
  ShoppingCart,
  Unlock,
  Home,
  Dices,
} from "lucide-react";
import Image from "next/image";
import Money from "@/components/Game/Money/Money";
import { GetPlayerFromId } from "@/utils/GetPlayerFromId";
import { GetFigureFromSelected } from "@/utils/GetFigureFromSelected";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import mini_train_right from "@/assets/emojis/mini_train_right.svg";
import mini_train_left from "@/assets/emojis/mini_train_left.svg";
import mini_train_top from "@/assets/emojis/mini_train_top.svg";
import mini_train_bottom from "@/assets/emojis/mini_train_bottom.svg";

type PropsType = {
  players: PlayersGetType[];
  cards: CardsGetType[];
  openIndex: number;
  setOpenIndex: React.Dispatch<React.SetStateAction<number>>;
  currentPlayer: Doc<"players">;
};

const imagesTrain = [
  mini_train_right,
  mini_train_left,
  mini_train_top,
  mini_train_bottom,
];

const statusStreet = [
  "Рента без домов",
  "Рента c 1 домом",
  "Рента с 2 домами",
  "Рента с 3 домами",
  "Рента с 4 домами",
  "Рента с отелем",
];

const statusTrain = [
  "Рента с одним поездом",
  "Рента с двумя поездами",
  "Рента с тремя поездами",
  "Рента с четырьмя поездами",
];

const statusNature = ["Рента с одной карточкой", "Рента с двумя карточками"];

export default function GameBoardCardInfo({
  players,
  cards,
  openIndex,
  setOpenIndex,
  currentPlayer,
}: PropsType) {
  const [off, setOff] = React.useState(false);
  const mortgage = useMutation(api.cards.mortgage);
  const unmortgage = useMutation(api.cards.unmortgage);
  const build = useMutation(api.cards.build);
  const unbuild = useMutation(api.cards.unbuild);
  const currentCard = cardsList[openIndex];
  const bdCard = cards[openIndex];

  if (bdCard === null) {
    return (
      <div className={styles.top}>
        <div className={styles.top_section}>
          <div className={styles.name}>{currentCard.name}</div>
          <div className={styles.mini_btns}>
            <button
              className={styles.mini_btn}
              onClick={() => setOpenIndex(-1)}
            >
              <X size={16} color="#ffffff" />
            </button>
          </div>
        </div>
        <div className={styles.desc}>{currentCard.desc}</div>
      </div>
    );
  }
  const renderBtnStreet = () => {
    if (bdCard.owner !== currentPlayer._id) {
      return "";
    }
    if (currentCard.class === "street" && bdCard) {
      if (bdCard.mortgage) {
        return (
          <button
            className={styles.btn}
            onClick={() => {
              unmortgage({
                players_id: currentPlayer._id,
                cards_id: bdCard._id,
                money: currentCard.unlock,
              });
            }}
          >
            Выкупить
          </button>
        );
      }
      if (currentPlayer.balance >= currentCard.build && bdCard.status === 0) {
        return (
          <>
            <button
              className={styles.btn}
              onClick={() => {
                mortgage({
                  players_id: currentPlayer._id,
                  cards_id: bdCard._id,
                  money: currentCard.buy / 2,
                });
              }}
            >
              Заложить
            </button>
            <button
              className={styles.btn}
              onClick={() => {
                build({
                  players_id: currentPlayer._id,
                  cards_id: bdCard._id,
                  money: currentCard.build,
                });
              }}
            >
              Купить дом
            </button>
          </>
        );
      }

      if (
        currentPlayer.balance >= currentCard.build &&
        bdCard.status > 0 &&
        bdCard.status < 4
      ) {
        return (
          <>
            <button
              className={styles.btn}
              onClick={() => {
                unbuild({
                  players_id: currentPlayer._id,
                  cards_id: bdCard._id,
                  money: currentCard.build,
                });
              }}
            >
              Продать дом
            </button>
            <button
              className={styles.btn}
              onClick={() => {
                build({
                  players_id: currentPlayer._id,
                  cards_id: bdCard._id,
                  money: currentCard.build,
                });
              }}
            >
              Купить дом
            </button>
          </>
        );
      }

      if (
        currentPlayer.balance < currentCard.build &&
        bdCard.status > 0 &&
        bdCard.status < 4
      ) {
        return (
          <>
            <button
              className={styles.btn}
              onClick={() => {
                unbuild({
                  players_id: currentPlayer._id,
                  cards_id: bdCard._id,
                  money: currentCard.build,
                });
              }}
            >
              Продать дом
            </button>
          </>
        );
      }

      if (currentPlayer.balance >= currentCard.build && bdCard.status === 4) {
        return (
          <>
            <button
              className={styles.btn}
              onClick={() => {
                unbuild({
                  players_id: currentPlayer._id,
                  cards_id: bdCard._id,
                  money: currentCard.build,
                });
              }}
            >
              Продать дом
            </button>
            <button
              className={styles.btn}
              onClick={() => {
                build({
                  players_id: currentPlayer._id,
                  cards_id: bdCard._id,
                  money: currentCard.build,
                });
              }}
            >
              Купить отель
            </button>
          </>
        );
      }

      if (bdCard.status === 5) {
        return (
          <button
            className={styles.btn}
            onClick={() => {
              unbuild({
                players_id: currentPlayer._id,
                cards_id: bdCard._id,
                money: currentCard.build,
              });
            }}
          >
            Продать отель
          </button>
        );
      }

      return (
        <button
          className={styles.btn}
          onClick={() => {
            mortgage({
              players_id: currentPlayer._id,
              cards_id: bdCard._id,
              money: currentCard.buy / 2,
            });
          }}
        >
          Заложить
        </button>
      );
    }
    return "че";
  };

  const renderBtnTrainNature = () => {
    if (bdCard.owner !== currentPlayer._id) {
      return "";
    }
    if (
      (currentCard.class === "train" || currentCard.class === "nature") &&
      bdCard
    ) {
      if (bdCard.mortgage) {
        return (
          <button
            className={styles.btn}
            onClick={() => {
              unmortgage({
                players_id: currentPlayer._id,
                cards_id: bdCard._id,
                money: currentCard.unlock,
              });
            }}
          >
            Выкупить
          </button>
        );
      }
      return (
        <button
          className={styles.btn}
          onClick={() => {
            mortgage({
              players_id: currentPlayer._id,
              cards_id: bdCard._id,
              money: currentCard.buy / 2,
            });
          }}
        >
          Заложить
        </button>
      );
    } else {
      return "";
    }
  };

  if (currentCard.class === "street") {
    return (
      <div className={styles.card}>
        <div className={styles.top}>
          <div className={styles.top_section}>
            <div className={styles.name}>{currentCard.name}</div>
            <div className={styles.mini_btns}>
              <button className={styles.mini_btn} onClick={() => setOff(!off)}>
                {off ? (
                  <EyeOff size={16} color="#ffffff" />
                ) : (
                  <Eye size={16} color="#ffffff" />
                )}
              </button>
              <button
                className={styles.mini_btn}
                onClick={() => setOpenIndex(-1)}
              >
                <X size={16} color="#ffffff" />
              </button>
            </div>
          </div>
          {off && <div className={styles.desc}>{currentCard.desc}</div>}
        </div>
        <div className={styles.bottom}>
          <div className={styles.group}>
            {currentCard.group.map((i) => {
              return (
                <Image
                  key={i}
                  src={cardsList[i].svg}
                  alt={cardsList[i].name}
                  width={22}
                  height={22}
                />
              );
            })}
          </div>
          <div className={styles.table}>
            <Image src={currentCard.svg} alt={currentCard.name} />
            <div className={styles.rent}>
              {statusStreet.map((el, index) => {
                return (
                  <div
                    key={index}
                    className={
                      index === bdCard.status && !bdCard.mortgage
                        ? styles.status + " " + styles.status_active
                        : styles.status
                    }
                  >
                    <div className={styles.status_title}>{el}</div>
                    <div className={styles.money}>
                      <Money value={currentCard.rent[index]} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.third}>
              <div
                className={
                  bdCard.mortgage
                    ? styles.status + " " + styles.status_active
                    : styles.status
                }
              >
                <div className={styles.status_title}>
                  <Lock size={16} color="#ffffff" />
                  Залог
                </div>
                <div className={styles.money}>
                  <Money value={currentCard.buy / 2} />
                </div>
              </div>
              <div
                className={
                  bdCard.buy
                    ? styles.status + " " + styles.status_active
                    : styles.status
                }
              >
                <div className={styles.status_title}>
                  <ShoppingCart size={16} color="#ffffff" />
                  Купить
                </div>
                <div className={styles.money}>
                  <Money value={currentCard.buy} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bottom_section}>
            <div className={styles.block}>
              <div className={styles.money}>
                <Unlock size={16} color="#ffffff" />
                <Money value={currentCard.unlock} />
              </div>
              <div className={styles.money}>
                <Home size={16} color="#ffffff" />
                <Money value={currentCard.build} />
              </div>
              {bdCard.owner && (
                <div
                  className={styles.owner}
                  style={{
                    backgroundColor: GetFigureFromSelected(
                      GetPlayerFromId(players, bdCard.owner)!,
                    ).bg,
                    color: GetFigureFromSelected(
                      GetPlayerFromId(players, bdCard.owner)!,
                    ).color,
                  }}
                >
                  {GetPlayerFromId(players, bdCard.owner)!.user?.name}
                </div>
              )}
            </div>
            <div className={styles.block}>{renderBtnStreet()}</div>
          </div>
        </div>
      </div>
    );
  }

  if (currentCard.class === "train") {
    return (
      <div className={styles.card}>
        <div className={styles.top}>
          <div className={styles.top_section}>
            <div className={styles.name}>{currentCard.name}</div>
            <div className={styles.mini_btns}>
              <button className={styles.mini_btn} onClick={() => setOff(!off)}>
                {off ? (
                  <EyeOff size={16} color="#ffffff" />
                ) : (
                  <Eye size={16} color="#ffffff" />
                )}
              </button>
              <button
                className={styles.mini_btn}
                onClick={() => setOpenIndex(-1)}
              >
                <X size={16} color="#ffffff" />
              </button>
            </div>
          </div>
          {off && <div className={styles.desc}>{currentCard.desc}</div>}
        </div>
        <div className={styles.bottom}>
          <div className={styles.group}>
            {imagesTrain.map((el, i) => {
              return <Image key={i} src={el} alt={el} />;
            })}
          </div>
          <div className={styles.table}>
            <Image src={currentCard.svg} alt={currentCard.name} />
            <div className={styles.rent}>
              {statusTrain.map((el, index) => {
                return (
                  <div
                    key={index}
                    className={
                      index === bdCard.status && !bdCard.mortgage
                        ? styles.status + " " + styles.status_active
                        : styles.status
                    }
                  >
                    <div className={styles.status_title}>{el}</div>
                    <div className={styles.money}>
                      <Money value={currentCard.rent[index]} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.third}>
              <div
                className={
                  bdCard.mortgage
                    ? styles.status + " " + styles.status_active
                    : styles.status
                }
              >
                <div className={styles.status_title}>
                  <Lock size={16} color="#ffffff" />
                  Залог
                </div>
                <div className={styles.money}>
                  <Money value={currentCard.buy / 2} />
                </div>
              </div>
              <div
                className={
                  bdCard.buy
                    ? styles.status + " " + styles.status_active
                    : styles.status
                }
              >
                <div className={styles.status_title}>
                  <ShoppingCart size={16} color="#ffffff" />
                  Купить
                </div>
                <div className={styles.money}>
                  <Money value={currentCard.buy} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bottom_section}>
            <div className={styles.block}>
              <div className={styles.money}>
                <Unlock size={16} color="#ffffff" />
                <Money value={currentCard.unlock} />
              </div>
              {bdCard.owner && (
                <div
                  className={styles.owner}
                  style={{
                    backgroundColor: GetFigureFromSelected(
                      GetPlayerFromId(players, bdCard.owner)!,
                    ).bg,
                    color: GetFigureFromSelected(
                      GetPlayerFromId(players, bdCard.owner)!,
                    ).color,
                  }}
                >
                  {GetPlayerFromId(players, bdCard.owner)!.user?.name}
                </div>
              )}
            </div>
            <div className={styles.block}>{renderBtnTrainNature()}</div>
          </div>
        </div>
      </div>
    );
  }

  if (currentCard.class === "nature") {
    return (
      <div className={styles.card}>
        <div className={styles.top}>
          <div className={styles.top_section}>
            <div className={styles.name}>{currentCard.name}</div>
            <div className={styles.mini_btns}>
              <button className={styles.mini_btn} onClick={() => setOff(!off)}>
                {off ? (
                  <EyeOff size={16} color="#ffffff" />
                ) : (
                  <Eye size={16} color="#ffffff" />
                )}
              </button>
              <button
                className={styles.mini_btn}
                onClick={() => setOpenIndex(-1)}
              >
                <X size={16} color="#ffffff" />
              </button>
            </div>
          </div>
          {off && <div className={styles.desc}>{currentCard.desc}</div>}
        </div>
        <div className={styles.bottom}>
          <div className={styles.group}>
            {currentCard.group.map((i) => {
              return (
                <Image
                  key={i}
                  src={cardsList[i].svg}
                  alt={cardsList[i].name}
                  width={22}
                  height={22}
                />
              );
            })}
          </div>
          <div className={styles.table}>
            <Image src={currentCard.svg} alt={currentCard.name} />
            <div className={styles.rent}>
              {statusNature.map((el, index) => {
                return (
                  <div
                    key={index}
                    className={
                      index === bdCard.status && !bdCard.mortgage
                        ? styles.status + " " + styles.status_active
                        : styles.status
                    }
                  >
                    <div className={styles.status_title}>{el}</div>
                    <div className={styles.money}>
                      x{currentCard.rent[index]}
                      <Dices size={14} color="#ffffff" />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.third}>
              <div
                className={
                  bdCard.mortgage
                    ? styles.status + " " + styles.status_active
                    : styles.status
                }
              >
                <div className={styles.status_title}>
                  <Lock size={16} color="#ffffff" />
                  Залог
                </div>
                <div className={styles.money}>
                  <Money value={currentCard.buy / 2} />
                </div>
              </div>
              <div
                className={
                  bdCard.buy
                    ? styles.status + " " + styles.status_active
                    : styles.status
                }
              >
                <div className={styles.status_title}>
                  <ShoppingCart size={16} color="#ffffff" />
                  Купить
                </div>
                <div className={styles.money}>
                  <Money value={currentCard.buy} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bottom_section}>
            <div className={styles.block}>
              <div className={styles.money}>
                <Unlock size={16} color="#ffffff" />
                <Money value={currentCard.unlock} />
              </div>
              {bdCard.owner && (
                <div
                  className={styles.owner}
                  style={{
                    backgroundColor: GetFigureFromSelected(
                      GetPlayerFromId(players, bdCard.owner)!,
                    ).bg,
                    color: GetFigureFromSelected(
                      GetPlayerFromId(players, bdCard.owner)!,
                    ).color,
                  }}
                >
                  {GetPlayerFromId(players, bdCard.owner)!.user?.name}
                </div>
              )}
            </div>
            <div className={styles.block}>{renderBtnTrainNature()}</div>
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
}
