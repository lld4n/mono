import React from "react";
import styles from "./IconButton.module.scss";

export default function IconButton({
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
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
