import { currentUser, User } from "@clerk/nextjs/server";
import Link from "next/link";

export const revalidate = 600;

export default async function Home() {
  const user = await currentUser();

  return <main>{user ? <LoggedInUser user={user} /> : <LoggedOutUser />}</main>;
}

function LoggedInUser({ user }: { user: User }) {
  return (
    <div>
      <p className="text-3xl font-semibold w-fit">{user.username}</p>
      <Link href="/deep-l" className="mt-4 text-3xl font-semibold block">
        DeepL
      </Link>
      <Link href="/news" className="mt-4 text-3xl font-semibold block">
        News
      </Link>
    </div>
  );
}

function LoggedOutUser() {
  return <div></div>;
}
