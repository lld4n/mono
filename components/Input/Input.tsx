import React from 'react';

type Input = {
  type: string;
  placeholder: string;
};
export default function Input({ type, placeholder }: Input) {
  return <input type={type} placeholder={placeholder} />;
}
