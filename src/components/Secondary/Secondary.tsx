import React, { useEffect, useState } from "react";
import styles from "./Secondary.module.scss";
import Link from "next/link";
import UserInfo from "@/components/UserInfo/UserInfo";
import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";

export default function Secondary() {
  const mutation = useMutation(api.users.store);
  const [userId, setUserId] = useState<Id<"users">>();
  useEffect(() => {
    const getUser = async () => {
      const userId = await mutation();
      setUserId(userId);
    };
    getUser();
  }, []);
  return (
    <div className={styles.content}>
      <Link href={"/rules"} className={styles.item}>
        Правила
      </Link>
      <Link href={"/open"} className={styles.item}>
        Открытые комнаты
      </Link>
      <Link href={"/come"} className={styles.item}>
        Войти в комнату
      </Link>
      <Link href={"/room"} className={styles.item}>
        Создать комнату
      </Link>
      {userId && (
        <div className={styles.user}>
          <UserInfo users_id={userId} />
        </div>
      )}
    </div>
  );
}
