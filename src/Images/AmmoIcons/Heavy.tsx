import * as React from 'react';

export interface HeavyProps {
  className?: string;
}

export const Heavy: React.FunctionComponent<HeavyProps> = ({ className }) => {
  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1434 1024" className={className}>
      <path fill="#b286ff" d="M460.8 243.2c38.4 0 89.6 128 89.6 179.2h-179.2c0-51.2 51.2-179.2 89.6-179.2z" />
      <path fill="#b286ff" d="M716.8 243.2c38.4 0 89.6 128 89.6 179.2h-179.2c0-51.2 51.2-179.2 89.6-179.2z" />
      <path fill="#b286ff" d="M972.8 243.2c38.4 0 89.6 128 89.6 179.2h-179.2c0-51.2 51.2-179.2 89.6-179.2z" />
      <path fill="#b286ff" d="M371.2 473.6h179.2v294.4h-179.2v-294.4z" />
      <path fill="#b286ff" d="M627.2 473.6h179.2v294.4h-179.2v-294.4z" />
      <path fill="#b286ff" d="M883.2 473.6h179.2v294.4h-179.2v-294.4z" />
      <path fill="#b286ff" d="M179.2 1024l-179.2-179.2v-665.6l179.2-179.2h1075.2l179.2 179.2v665.6l-179.2 179.2zM230.4 896h972.8l102.4-102.4v-563.2l-102.4-102.4h-972.8l-102.4 102.4v563.2z" />
    </svg>
  );
}