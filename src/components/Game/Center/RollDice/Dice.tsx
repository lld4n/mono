import Image from "next/image";
import dice0 from "../../../../assets/dices/0.svg";
import dice1 from "../../../../assets/dices/1.svg";
import dice2 from "../../../../assets/dices/2.svg";
import dice3 from "../../../../assets/dices/3.svg";
import dice4 from "../../../../assets/dices/4.svg";
import dice5 from "../../../../assets/dices/5.svg";
import dice6 from "../../../../assets/dices/6.svg";

export default function Dice({ level }: { level: number }) {
  return (
    <>
      {level === 0 ? <Image src={dice0} alt={"dice"} /> : ""}
      {level === 1 ? <Image src={dice1} alt={"dice"} /> : ""}
      {level === 2 ? <Image src={dice2} alt={"dice"} /> : ""}
      {level === 3 ? <Image src={dice3} alt={"dice"} /> : ""}
      {level === 4 ? <Image src={dice4} alt={"dice"} /> : ""}
      {level === 5 ? <Image src={dice5} alt={"dice"} /> : ""}
      {level === 6 ? <Image src={dice6} alt={"dice"} /> : ""}
    </>
  );
}
