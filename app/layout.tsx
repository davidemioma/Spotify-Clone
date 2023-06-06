import "./globals.css";
import { Figtree } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { Userprovider } from "@/context/useCurrentUser";
import { ModalProvider } from "@/providers/ModalProvider";
import SupabaseProvider from "@/providers/SuperbaseProvider";
import ToasterProvider from "@/providers/ToasterProvider";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Clone",
  description: "Spotify Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <ToasterProvider />

          <ModalProvider />

          <Userprovider>
            <Sidebar>{children}</Sidebar>
          </Userprovider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
