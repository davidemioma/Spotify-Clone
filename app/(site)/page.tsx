import { getSongs } from "@/actions/getSongs";
import Header from "@/components/Header";
import LikedListBtn from "@/components/LikedListBtn";
import PageContent from "./components/PageContent";

//This means this page will not be cached and the data on this page will always be up to date
export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  return (
    <div className="bg-neutral-900 w-full h-full rounded-lg overscroll-y-auto overflow-x-hidden">
      <Header>
        <div className="mb-4 space-y-4">
          <h1 className="text-white text-3xl font-semibold">Welcome back</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-col-4 gap-3">
            <LikedListBtn
              image="/assets/liked.png"
              name="Liked Songs"
              href="/liked"
            />
          </div>
        </div>
      </Header>

      <div className="px-6 pb-20 sm:pb-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Newest Song</h1>
        </div>

        <PageContent songs={songs} />
      </div>
    </div>
  );
}
