import { currentUser } from "@clerk/nextjs/server";
import { Landing } from "@/components/landing";
import Main from "@/components/main";

export const revalidate = 600;

export default async function Home() {
  const user = await currentUser();

  return <main>{user ? <Main /> : <Landing />}</main>;
}
