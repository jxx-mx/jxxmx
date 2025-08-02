import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

export function Nav() {
  return (
    <header className="border-b border-b-foreground/10">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
        <div className="text-xl font-semibold">
          <Link href="/">JXXMX</Link>
        </div>
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
