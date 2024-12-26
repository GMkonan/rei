import { Resend } from "resend";
import NewPostsNotifyMail from "../emails/new-posts-notify";
import React from "react";
import type { SelectPost } from "../db/schema";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (posts: SelectPost[]) => {
  await resend.emails
    .send({
      from: "Rei RSS <rei@gmkonan.dev>",
      to: process.env.EMAIL as string,
      subject: "New posts!",
      react: <NewPostsNotifyMail posts={posts} />,
    })
    .catch((err) => {
      console.error(err);
    });
};

export default sendEmail;
