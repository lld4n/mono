import React from 'react';
import Image from "next/image";
import Logo from '../../assets/logo.svg'
import {Loader2} from "lucide-react";
import styles from "./Loading.module.scss"
export default function Loading() {
  return (
    <div className={styles.content}>
      <Image src={Logo} alt={"logo"} width={1000} height={200}/>
      <Loader2 size={20} color={'#ffffff'} className={styles.loader}/>
    </div>
  );
};
