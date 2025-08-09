import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Navigation } from "@/components/navigation";
import { currentUser } from "@clerk/nextjs/server";

export async function TopHeader() {
  const user = await currentUser();
  return (
    <header className="mb-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
        {user ? (
          <Navigation />
        ) : (
          <div className="text-sm font-semibold flex items-center gap-2">
            <p>ISSUE CHECK</p>
          </div>
        )}
        <div className="flex items-center gap-2">
          <SignedOut>
            <SignInButton>
              <Button type="button" size={"sm"} variant={"outline"}>
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button type="button" size={"sm"} variant={"default"}>
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
