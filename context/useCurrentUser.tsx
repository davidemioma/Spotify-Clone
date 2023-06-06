"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/auth-helpers-nextjs";
import { SubscriptionProps, UserProps } from "@/types";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";

type UserType = {
  access_token: string | null;
  user: User | null;
  userDetails: UserProps | null;
  isLoading: boolean;
  subscription: SubscriptionProps | null;
};

export const UserContext = createContext<UserType | null>(null);

export interface Props {
  children: React.ReactNode;
}

export const Userprovider = ({ children }: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: superbase,
  } = useSessionContext();

  const user = useSupaUser();

  const access_token = session?.access_token ?? null;

  const [isLoadingData, setIsLoadingData] = useState(false);

  const [userDetails, setUserDetails] = useState<UserProps | null>(null);

  const [subscription, setSubscription] = useState<SubscriptionProps | null>(
    null
  );

  const getUserDetail = () => superbase.from("users").select("*").single();

  const getSubscription = () =>
    superbase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetail(), getSubscription()]).then((res) => {
        const userDetailsPromise = res[0];

        const subscriptionPromise = res[1];

        if (userDetailsPromise.status === "fulfilled") {
          setUserDetails(userDetailsPromise.value.data as UserProps);
        }

        if (subscriptionPromise.status === "fulfilled") {
          setSubscription(subscriptionPromise.value.data as SubscriptionProps);
        }

        setIsLoadingData(false);
      });
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);

      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    access_token,
    user,
    isLoading: isLoadingUser || isLoadingData,
    userDetails,
    subscription,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useCurrentUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error(
      `useCurrentUser must be used within a MyUserContextProvider.`
    );
  }

  return context;
};
