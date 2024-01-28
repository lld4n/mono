import React from "react";
import styles from "./UserInfo.module.scss";
import { Id } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Award, BookmarkX, LogOut } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import MiniLoading from "@/components/Global/MiniLoading/MiniLoading";

export default function UserInfo({ users_id }: { users_id: Id<"users"> }) {
  const user = useQuery(api.users.get, {
    users_id,
  });
  if (!user) {
    return (
      <div className={styles.wrapper}>
        <MiniLoading />
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <Image
        src={user.picture}
        alt="avatar"
        className={styles.avatar}
        width={47}
        height={47}
        priority
      />
      {user.losers > 0 || user.wins > 0 ? (
        <div className={styles.achievements}>
          {user.wins > 0 && (
            <div className={styles.achieve}>
              <Award size={16} color="#ffffff" />
              <span className={styles.count}>{user.wins}</span>
            </div>
          )}
          {user.losers > 0 && (
            <div className={styles.achieve}>
              <BookmarkX size={16} color="#ffffff" />
              <span className={styles.count}>{user.losers}</span>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
      <div className={styles.name}>{user.name}</div>
      <SignOutButton>
        <button className={styles.btn}>
          <LogOut size={20} color="#ffffff" />
        </button>
      </SignOutButton>
    </div>
  );
}
