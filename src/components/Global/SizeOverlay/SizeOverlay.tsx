"use client";
import React from "react";
import styles from "./SizeOverlay.module.scss";
import UAParser from "ua-parser-js";
import { Command, MoveHorizontal, MoveVertical, Wrench } from "lucide-react";
import Image from "next/image";
import mini_logo from "@/assets/mini-logo.svg";
const MIN_HEIGHT = 848;
const MIN_WIDTH = 1500;
export default function SizeOverlay({
  children,
}: {
  children: React.ReactNode;
}) {
  const [view, setView] = React.useState(true);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  React.useEffect(() => {
    const handle = () => {
      if (window.innerWidth < MIN_WIDTH || window.innerHeight < MIN_HEIGHT) {
        setView(false);
      } else {
        setView(true);
      }
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handle);
    handle();
    return () => {
      window.removeEventListener("resize", handle);
    };
  }, []);
  const parser = new UAParser();
  console.log(parser.getResult());
  return (
    <>
      {view ? (
        children
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.top}>
            <Image src={mini_logo} alt="logo" className={styles.logo} />
            <div className={styles.title}>
              К сожалению, mono не поддерживается на маленьких экранах
            </div>
            <div className={styles.desc}>
              {parser.getOS().name === "Mac OS" ? (
                <>
                  <div>Используйте сочетание</div>
                  <div className={styles.command}>
                    <Command size={16} />-
                  </div>
                  <div>пока это сообщение не пропадет</div>
                </>
              ) : parser.getDevice().type === "desktop" ? (
                <>
                  <div>Используйте сочетание</div>
                  <div className={styles.command}>CTRL -</div>
                  <div>пока это сообщение не пропадет</div>
                </>
              ) : (
                <>Играйте в монополию на компьютере</>
              )}
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.block}>
              <Wrench size={16} />
              <span>
                <span className={styles.gray}>OS:</span> {parser.getOS().name}
              </span>
            </div>
            <div className={styles.block}>
              <MoveHorizontal size={16} />
              <span>
                <span className={styles.gray}>Width:</span> {width}
                px
              </span>
            </div>
            <div className={styles.block}>
              <MoveVertical size={16} />
              <span>
                <span className={styles.gray}>Height:</span> {height}px
              </span>
            </div>
            <div className={styles.footer}>
              <div>min-width: {MIN_WIDTH}px</div>
              <div>min-height: {MIN_HEIGHT}px</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
