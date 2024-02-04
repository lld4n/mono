import styles from "@/components/Game/Swap/Swap.module.scss";
import IconButton from "@/components/Buttons/IconButton/IconButton";
import { X } from "lucide-react";
import React from "react";

export default function Top({
  setOpenSwap,
  title,
  functionalComponent,
}: {
  setOpenSwap?: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  functionalComponent: boolean;
}) {
  return (
    <div className={styles.top}>
      <h1 className={styles.head}>{title}</h1>
      {functionalComponent && (
        <IconButton onClick={() => setOpenSwap!(false)}>
          <X size={16} color="#ffffff" />
        </IconButton>
      )}
    </div>
  );
}
