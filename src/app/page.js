"use client";
import Image from "next/image";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { Profile } from "./Profile";
import { mainnet, polygonMumbai } from "viem/chains";
import Outstanding from "./Outstanding";
import { useState } from "react";

const { chains, publicClient } = configureChains(
  [mainnet],
  [
    // alchemyProvider({ apiKey: "yourAlchemyApiKey" }),
    publicProvider(),
  ]
);

const config = createConfig({
  autoConnect: true,
  // connectors: [new MetaMaskConnector()],
  publicClient,
});

export default function Home() {
  return (
    <WagmiConfig config={config}>
      <main className="gradient-background flex min-h-screen flex-col ">
        <Profile></Profile>
        <Outstanding></Outstanding>
      </main>
    </WagmiConfig>
  );
}
