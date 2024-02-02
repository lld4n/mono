import React from "react";
import styles from "./Button.module.scss";

export default function Button({
  children,
  className,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) {
  return (
    <button
      className={styles.wrapper + " " + className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
