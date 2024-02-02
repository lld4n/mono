import React from "react";
import { SignInButton } from "@clerk/nextjs";
import Button from "@/components/Global/Button/Button";

export default function Primary() {
  return (
    <SignInButton mode="modal">
      <Button>
        <span>Войти</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.1096 5.47282C13.0428 4.49099 11.707 3.98189 10.2042 3.98189C7.55105 3.98189 5.29684 5.73647 4.48977 8.10014L4.48975 8.10013V8.10043C4.28567 8.70044 4.16507 9.33681 4.16507 10.0005C4.16507 10.6641 4.28567 11.3005 4.48975 11.9005L4.47849 11.9089H4.48977C5.29684 14.2726 7.55105 16.0272 10.2042 16.0272C11.5771 16.0272 12.7367 15.6636 13.6458 15.0635L13.646 15.0637C14.7312 14.3546 15.4547 13.3001 15.6959 12.0548H10.2041V8.18196H19.8147C19.9353 8.83652 20.0002 9.51835 20.0002 10.2275C20.0002 13.273 18.887 15.8366 16.9575 17.5821H16.9571C15.2688 19.1092 12.9591 20 10.2042 20C6.21522 20 2.7736 17.7545 1.09454 14.4908V14.4823L1.09452 14.4824C0.398772 13.1369 -0.00012207 11.6187 -0.00012207 10.0005C-0.00012207 8.38225 0.398772 6.86404 1.09452 5.51856H1.09491L1.09454 5.51828C2.7736 2.24549 6.21522 0 10.2042 0C12.9593 0 15.2599 0.990927 17.0317 2.60914L14.1096 5.47282Z"
            fill="white"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.0085 0C4.47418 0 0.000244141 4.58331 0.000244141 10.2535C0.000244141 14.786 2.86685 18.6226 6.84359 19.9805C7.34079 20.0826 7.52291 19.7599 7.52291 19.4885C7.52291 19.2508 7.50652 18.436 7.50652 17.587C4.72247 18.1983 4.14272 16.3647 4.14272 16.3647C3.69531 15.1764 3.03238 14.871 3.03238 14.871C2.12116 14.2429 3.09875 14.2429 3.09875 14.2429C4.10953 14.3108 4.63991 15.2954 4.63991 15.2954C5.53454 16.857 6.97614 16.4158 7.5561 16.1441C7.63886 15.482 7.90416 15.0237 8.18584 14.7691C5.96536 14.5314 3.62914 13.6487 3.62914 9.71017C3.62914 8.58976 4.02656 7.67309 4.6563 6.96018C4.55695 6.7056 4.20889 5.65289 4.75587 4.24394C4.75587 4.24394 5.60091 3.97228 7.50632 5.29644C8.32209 5.07199 9.16338 4.95782 10.0085 4.95685C10.8535 4.95685 11.715 5.07581 12.5104 5.29644C14.416 3.97228 15.2611 4.24394 15.2611 4.24394C15.8081 5.65289 15.4598 6.7056 15.3604 6.96018C16.0068 7.67309 16.3878 8.58976 16.3878 9.71017C16.3878 13.6487 14.0516 14.5143 11.8145 14.7691C12.1792 15.0916 12.4938 15.7026 12.4938 16.6703C12.4938 18.0453 12.4775 19.1489 12.4775 19.4883C12.4775 19.7599 12.6598 20.0826 13.1568 19.9808C17.1335 18.6224 20.0001 14.786 20.0001 10.2535C20.0165 4.58331 15.5262 0 10.0085 0Z"
            fill="white"
          />
        </svg>
      </Button>
    </SignInButton>
  );
}
