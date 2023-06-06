import "./globals.css";
import { Figtree } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { Userprovider } from "@/context/useCurrentUser";
import { ModalProvider } from "@/providers/ModalProvider";
import SupabaseProvider from "@/providers/SuperbaseProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import { getSongsByUserId } from "@/actions/getSongsByUserId";

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

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />

        <SupabaseProvider>
          <Userprovider>
            <ModalProvider />

            <Sidebar songs={songsByCurrentUser}>{children}</Sidebar>
          </Userprovider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
