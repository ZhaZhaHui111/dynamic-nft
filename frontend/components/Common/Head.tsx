import NextHead from "next/head";
import React from "react";

interface HeadProps {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;
}

const Head = ({
  title = "Dynamic NFT",
  description = "Mint dNFT and stake",
  image = "",
  keywords = "stake, blockchain, near",
}: HeadProps) => {
  const _title = title; //=== 'Paras Staking' ? 'Paras Staking' : `${title} - Paras Staking`

  return (
    <NextHead>
      <title>{_title}</title>
      <meta name="title" content={_title} />
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={_title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
    </NextHead>
  );
};

export default Head;
