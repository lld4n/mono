import React, { useEffect, useState } from "react";
import styles from "./Secondary.module.scss";
import Link from "next/link";
import UserInfo from "@/components/Home/UserInfo/UserInfo";
import { api } from "../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import Button from "@/components/Global/Button/Button";
import { toast } from "sonner";

export default function Secondary() {
  const store = useMutation(api.users.store);
  const [userId, setUserId] = useState<Id<"users">>();
  useEffect(() => {
    toast.promise(store, {
      loading: "Определяем пользователя",
      success: (data) => {
        setUserId(data);
        return "Пользователь определен";
      },
      error: (error) => error,
    });
  }, []);
  return (
    <>
      <Link href="/open">
        <Button>Открытые комнаты</Button>
      </Link>
      <Link href="/come">
        <Button>Войти в комнату</Button>
      </Link>
      <Link href="/room">
        <Button>Создать комнату</Button>
      </Link>
      {userId && (
        <div className={styles.user}>
          <UserInfo users_id={userId} />
        </div>
      )}
    </>
  );
}
