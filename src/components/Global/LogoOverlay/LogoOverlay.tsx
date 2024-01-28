import React from "react";
import MiniLogo from "../../../assets/mini-logo.svg";
import Image from "next/image";
import styles from "./LogoOverlay.module.scss";
import Link from "next/link";
export default function LogoOverlay({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={styles.content}>
        <Link className={styles.logo} href={"/"}>
          <Image
            src={MiniLogo}
            alt={"mini-logo"}
            width={115}
            height={40}
            priority
          />
        </Link>
      </div>
      {children}
    </>
  );
}
