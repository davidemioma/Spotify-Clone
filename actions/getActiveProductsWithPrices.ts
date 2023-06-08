import { cookies } from "next/headers";
import { ProductWithPricesProps } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const getActiveProductsWithPrices = async (): Promise<
  ProductWithPricesProps[]
> => {
  try {
    const supabase = createServerComponentClient({
      cookies,
    });

    const { data, error } = await supabase
      .from("products")
      .select("*, prices(*)")
      .eq("active", true)
      .eq("prices.active", true)
      .order("metadata->index") //This means ordering data numerically or alphabetically
      .order("unit_amount", { foreignTable: "prices" });

    if (error) return [];

    return (data as any) || [];
  } catch (err) {
    return [];
  }
};
