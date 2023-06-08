"use client";

import { useEffect, useState } from "react";
import { ProductWithPricesProps } from "@/types";
import AuthModal from "@/components/modal/AuthModal";
import UploadModal from "@/components/modal/UploadModal";
import SubscribeModal from "@/components/modal/SubscribeModal";

interface Props {
  products: ProductWithPricesProps[];
}

export const ModalProvider = ({ products }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AuthModal />

      <UploadModal />

      <SubscribeModal products={products} />
    </>
  );
};
