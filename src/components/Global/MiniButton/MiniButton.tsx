import React from "react";
import styles from "./MiniButton.module.scss";

export default function MiniButton({
  children,
  className,
  onClick,
  disabled,
  danger,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      className={
        danger
          ? styles.danger + " " + className
          : styles.wrapper + " " + className
      }
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
