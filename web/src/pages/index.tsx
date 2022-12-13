import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { GameSelectionContainer } from '@/features';

export default function Home(): React.ReactNode {
  return <GameSelectionContainer />;
}

function Main() {
  return (
    <div className={`w-[500px] bg-red-500`}>
      <h1>Hello</h1>
    </div>
  );
}
