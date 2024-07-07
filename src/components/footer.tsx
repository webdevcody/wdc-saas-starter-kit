import { applicationName, companyName } from "@/app-config";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <>
      <footer className="border-t bg-gray-100 dark:bg-background">
        <div className="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-3">
            <div>
              <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Company
              </h3>
            </div>
            <div>
              <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Help center
              </h3>
              <ul className="text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h3>
              <ul className="text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <Link href="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/terms-of-service" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className="py-8 pb-8 bg-white dark:bg-gray-900">
        <div className="text-center">
          <a
            href="#"
            className="gap-4 flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <Image
              src="/group.jpeg"
              className="w-10 h-10 rounded-xl"
              alt="Landwind Logo"
              width="100"
              height="100"
            />
            {applicationName}
          </a>
          <span className="block text-sm text-center text-gray-500 dark:text-gray-400">
            © 2024 {applicationName}. All Rights Reserved. Built with ❤️ by{" "}
            {companyName}
          </span>
        </div>
      </div>
    </>
  );
}
