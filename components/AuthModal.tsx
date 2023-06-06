"use client";

import React, { useEffect } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import useAuthModal from "@/hooks/useAuthModal";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

const AuthModal = () => {
  const router = useRouter();

  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();

  const { session } = useSessionContext();

  useEffect(() => {
    if (session) {
      router?.refresh();

      authModal?.onClose();
    }
  }, [session, router, authModal.onClose]);

  return (
    <Modal
      title="Welcome back"
      description="Login to your account."
      isOpen={authModal.isOpen}
      onClose={() => authModal.onClose()}
    >
      <Auth
        theme="dark"
        providers={["github", "google"]}
        magicLink
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
