import "./globals.css";
import { Figtree } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Player from "@/components/player/Player";
import { Userprovider } from "@/context/useCurrentUser";
import { ModalProvider } from "@/providers/ModalProvider";
import SupabaseProvider from "@/providers/SuperbaseProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import { getSongsByUserId } from "@/actions/getSongsByUserId";
import { getActiveProductsWithPrices } from "@/actions/getActiveProductsWithPrices";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Clone",
  description: "Spotify Clone",
};

//This means this page will not be cached and the data on this page will always be up to date
export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const songsByCurrentUser = await getSongsByUserId();

  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />

        <SupabaseProvider>
          <Userprovider>
            <ModalProvider products={products} />

            <Sidebar songs={songsByCurrentUser}>{children}</Sidebar>

            <Player />
          </Userprovider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
