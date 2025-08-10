import { currentUser } from "@clerk/nextjs/server";
import { Landing } from "@/components/landing";
import Main from "@/components/main";
import { auth } from "@clerk/nextjs/server";

export const revalidate = 600;

export default async function Home() {
  const { isAuthenticated, actor, orgId, userId } = await auth();

  const user = await currentUser();

  console.log("=== 인증 정보 ===");
  console.log("인증 상태:", isAuthenticated);
  console.log("사용자 ID:", userId);
  console.log("액터:", actor);
  console.log("조직 ID:", orgId);
  console.log(
    "사용자 정보:",
    user?.id,
    user?.emailAddresses?.[0]?.emailAddress
  );

  return <>{user ? <Main /> : <Landing />}</>;
}
