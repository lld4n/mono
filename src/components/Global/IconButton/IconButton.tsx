import React from "react";
import styles from "./IconButton.module.scss";

export default function IconButton({
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
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
