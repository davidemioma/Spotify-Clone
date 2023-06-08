import Header from "@/components/Header";
import AccountContent from "./components/AccountContent";

export default async function Account() {
  return (
    <div className="bg-neutral-900 w-full h-full rounded-lg overscroll-y-auto overflow-x-hidden">
      <Header className="from-neutral-900">
        <h1 className="text-3xl font-semibold mb-2">Account Settings</h1>
      </Header>

      <AccountContent />
    </div>
  );
}
