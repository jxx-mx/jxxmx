import { currentUser, User } from "@clerk/nextjs/server";
import Link from "next/link";

export const revalidate = 600;

export default async function Home() {
  const user = await currentUser();

  return (
    <main>
      <h1>Home Page</h1>
      {user ? <LoggedInUser user={user} /> : <LoggedOutUser />}
    </main>
  );
}

function LoggedInUser({ user }: { user: User }) {
  return (
    <div>
      Welcome {user.fullName} go to <Link href="/protected">protected</Link>
    </div>
  );
}

function LoggedOutUser() {
  return <div></div>;
}
