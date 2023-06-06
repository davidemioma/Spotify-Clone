import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import { getSongsByTitle } from "@/actions/getSongsByTitle";
import SearchContent from "./components/SearchContent";

export const revalidate = 0;

interface Props {
  searchParams: { title: string };
}

export default async function Search({ searchParams }: Props) {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div className="bg-neutral-900 w-full h-full rounded-lg overscroll-y-auto overflow-x-hidden">
      <Header className="from-neutral-900">
        <div className="flex flex-col gap-6">
          <h1 className="text-white text-2xl md:text-3xl font-semibold">
            Search
          </h1>

          <SearchInput />
        </div>
      </Header>

      <SearchContent songs={songs} />
    </div>
  );
}
