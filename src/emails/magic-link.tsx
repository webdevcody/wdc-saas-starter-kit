import * as React from "react";

import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import { env } from "@/env";
import { applicationName } from "@/app-config";

export const BASE_URL = env.HOST_NAME;

export function MagicLinkEmail({ token }: { token: string }) {
  const previewText = `You're been invted to a group!`;
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <React.Fragment>
          <Body className="bg-white my-auto mx-auto font-sans">
            <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
              <Section className="mt-[32px]">
                <Img
                  src={`${BASE_URL}/group.jpeg`}
                  width="160"
                  height="48"
                  alt="StarterKit"
                  className="my-0 mx-auto"
                />
              </Section>

              <Section className="text-center mt-[32px] mb-[32px]">
                <Text className="text-black font-medium text-[14px] leading-[24px] mb-8">
                  You&apos;re magic link login is below, click to login. group.
                </Text>

                <Text className="text-black font-medium text-[14px] leading-[24px]">
                  <Link
                    href={`${BASE_URL}/api/login/magic?token=${token}`}
                    target="_blank"
                    className="text-[#2754C5] underline"
                  >
                    Login using Magic Link
                  </Link>
                </Text>
              </Section>

              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

              <Text className="text-[#666666] text-[12px] leading-[24px] flex items-center justify-center">
                © 2024 {applicationName}. All rights reserved.
              </Text>
            </Container>
          </Body>
        </React.Fragment>
      </Tailwind>
    </Html>
  );
}
