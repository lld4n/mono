import React from "react";
import styles from "./CardInfoRender.module.scss";
import { Eye, EyeOff, X } from "lucide-react";
import { CardListType } from "@/types/card/CardListType";
import IconButton from "@/components/Buttons/IconButton/IconButton";

export default function Top({
  currentCard,
  setOpenIndex,
  offRender,
}: {
  currentCard: CardListType;
  setOpenIndex: React.Dispatch<React.SetStateAction<number>>;
  offRender: boolean;
}) {
  const [off, setOff] = React.useState(!offRender);

  return (
    <div className={styles.top}>
      <div className={styles.top_section}>
        <div className={styles.name}>{currentCard.name}</div>
        <div className={styles.mini_btns}>
          {offRender && (
            <IconButton onClick={() => setOff(!off)}>
              {off ? (
                <EyeOff size={16} color="#ffffff" />
              ) : (
                <Eye size={16} color="#ffffff" />
              )}
            </IconButton>
          )}
          <IconButton onClick={() => setOpenIndex(-1)}>
            <X size={16} color="#ffffff" />
          </IconButton>
        </div>
      </div>
      {off && <div className={styles.desc}>{currentCard.desc}</div>}
    </div>
  );
}
