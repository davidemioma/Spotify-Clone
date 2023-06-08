"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { postData } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/context/useCurrentUser";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import Button from "@/components/Button";

const AccountContent = () => {
  const router = useRouter();

  const currentUser = useCurrentUser();

  const subsModal = useSubscribeModal();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser?.isLoading && !currentUser?.user) {
      router.replace("/");
    }
  }, [currentUser?.isLoading, currentUser?.user, router]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);

    try {
      const { url } = await postData({
        url: "/api/create-portal-link",
      });

      toast.loading("Redirecting...");

      window.location.assign(url);
    } catch (err) {
      return toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 mb-7">
      {currentUser?.subscription ? (
        <div className="flex flex-col gap-4">
          <p>
            You are currently on the{" "}
            <b>{currentUser?.subscription?.prices?.products?.name}</b> plan.
          </p>

          <Button
            className="bg-green-500 max-w-[300px] text-black"
            onClick={redirectToCustomerPortal}
            disabled={loading}
          >
            Open customer portal
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p>No active plan.</p>

          <Button
            className="bg-green-500 max-w-[300px] text-black"
            onClick={() => subsModal.onOpen()}
          >
            Subscribe
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountContent;
