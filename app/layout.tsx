import "./globals.css";
import { Figtree } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { Userprovider } from "@/hooks/useCurrentUser";
import SupabaseProvider from "@/providers/SuperbaseProvider";

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
          <Userprovider>
            <Sidebar>{children}</Sidebar>
          </Userprovider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
