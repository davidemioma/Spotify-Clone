"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import Button from "../Button";
import { toast } from "react-hot-toast";
import { getStripe } from "@/lib/stripeClient";
import { formatPrice, postData } from "@/lib/helpers";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useCurrentUser } from "@/context/useCurrentUser";
import { PriceProps, ProductWithPricesProps } from "@/types";

interface Props {
  products: ProductWithPricesProps[];
}

const SubscribeModal = ({ products }: Props) => {
  const subscribeModal = useSubscribeModal();

  const currentUser = useCurrentUser();

  const [priceIdLoading, setPriceIdLoading] = useState("");

  const handleCheckout = async (price: PriceProps) => {
    setPriceIdLoading(price.id);

    if (!currentUser?.user) {
      setPriceIdLoading("");

      return toast.error("Must be logged in");
    }

    if (currentUser.subscription) {
      setPriceIdLoading("");

      return toast("Already subscribed");
    }

    try {
      const stripe = await getStripe();

      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      toast.loading("Redirecting...");

      await stripe?.redirectToCheckout({ sessionId });
    } catch (err) {
      return toast.error((err as Error)?.message);
    } finally {
      setPriceIdLoading("");
    }
  };

  let content = <div className="text-center">No products available.</div>;

  if (products.length > 0) {
    content = (
      <div>
        <div className="flex flex-col gap-3 text-center text-sm mb-4">
          <p>Stripe Test Card: 4242 4242 4242 4242</p>

          <p>Stripe Test Expiry: 4/24 (anything in the future)</p>

          <p>Stripe Test CVC: 242 (any 3 digit number)</p>
        </div>

        {products.map((product) => {
          if (!product.prices?.length) {
            return (
              <div key={product.id} className="text-center">
                No prices available.
              </div>
            );
          }

          return product.prices.map((price) => (
            <Button
              key={price.id}
              className="bg-green-500 text-black mb-4"
              onClick={() => handleCheckout(price)}
              disabled={currentUser?.isLoading || priceIdLoading === price.id}
            >
              Subscribe for {formatPrice(price)} a {price.interval}
            </Button>
          ));
        })}
      </div>
    );
  }

  if (currentUser?.subscription) {
    content = <div className="text-center">Already subscribed.</div>;
  }

  return (
    <Modal
      title="Only for premium users"
      description="Listen to music with Spotify Premium"
      isOpen={subscribeModal.isOpen}
      onClose={() => subscribeModal.onClose()}
    >
      {content}
    </Modal>
  );
};

export default SubscribeModal;
