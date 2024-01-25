import React from "react";
import styles from "./UserInfo.module.scss";
import { Id } from "../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Loader2, LogOut } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

export default function UserInfo({ users_id }: { users_id: Id<"users"> }) {
  const user = useQuery(api.users.get, {
    users_id,
  });
  if (!user) {
    return <Loader2 size={20} color={"#ffffff"} className={styles.loader} />;
  }
  return (
    <div className={styles.wrapper}>
      <img src={user.picture} alt="avatar" className={styles.avatar} />
      <div className={styles.name}>{user.name}</div>
      <SignOutButton>
        <button className={styles.btn}>
          <LogOut size={20} color="#ffffff" />
        </button>
      </SignOutButton>
    </div>
  );
}
