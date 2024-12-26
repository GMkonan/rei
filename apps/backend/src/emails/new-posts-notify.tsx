import * as React from "react";
import { Tailwind, Section, Text } from "@react-email/components";
import type { SelectPost } from "../db/schema";

type PostInfoProps = {
  posts: SelectPost[];
};

export default function NewPostsNotifyMail({ posts }: PostInfoProps) {
  return (
    <Tailwind>
      <Section className="flex justify-center items-center w-full min-h-screen font-sans">
        <Section className="flex flex-col items-center w-76 rounded-2xl px-6 py-1 bg-gray-50">
          <Text className="text-xs font-medium text-violet-500">
            Verify your Email Address
          </Text>
          <Text className="text-gray-500 my-0">
            Use the following code to verify your email address
          </Text>
          <Text className="text-5xl font-bold pt-2">{posts[0].title}</Text>
          <Text className="text-gray-400 font-light text-xs pb-4">
            This code is valid for 10 minutes
          </Text>
          <Text className="text-gray-600 text-xs">Thank you joining us</Text>
        </Section>
      </Section>
    </Tailwind>
  );
}

NewPostsNotifyMail.PreviewProps = {
  title: "My super cool new post",
};
