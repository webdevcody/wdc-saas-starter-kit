import { SignedIn } from "@/components/auth";
import { SignedOut } from "@/components/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="grid max-w-screen-xl px-4 pt-12 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-24 lg:grid-cols-12 lg:pt-16">
          <div className="mr-auto place-self-center col-span-7">
            <h1 className="max-w-2xl mb-8 text-4xl leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
              Create and Browse Groups for your favorite Hobbies
            </h1>

            <h2 className="text-2xl mb-4">
              Discover like-minded individuals and start a group for any hobby
              or sport you love
            </h2>

            <p className="text-23xl max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Our online service makes it easy to connect with others who share
              your interests, whether it's hiking, painting, or playing soccer.
              Create or join a group, schedule meetups, and enjoy pursuing your
              passions with new friends by your side. Start building your
              community today!
            </p>

            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <SignedIn>
                <Button asChild>
                  <Link href={"/dashboard"}>View Dashboard</Link>
                </Button>
              </SignedIn>

              <SignedOut>
                <Button asChild>
                  <Link href={"/api/auth/signin"}>Create an Account</Link>
                </Button>
              </SignedOut>
            </div>
          </div>

          <div className="hidden lg:mt-0 lg:col-span-4 lg:flex justify-center items-center">
            <Image
              className="rounded-xl w-[400px] h-[400px]"
              width="200"
              height="200"
              src="/group.jpeg"
              alt="hero image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
