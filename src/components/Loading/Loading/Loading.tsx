import React from "react";
import Image from "next/image";
import Logo from "../../../assets/logo.svg";
import styles from "./Loading.module.scss";
import MiniLoading from "@/components/Loading/MiniLoading/MiniLoading";
export default function Loading() {
  return (
    <div className={styles.content}>
      <Image src={Logo} alt={"logo"} width={1000} height={200} />
      <MiniLoading />
    </div>
  );
}
