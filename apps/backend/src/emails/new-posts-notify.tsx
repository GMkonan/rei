import {
  Tailwind,
  Section,
  Text,
  Html,
  Preview,
  Body,
  Container,
  Link,
  Hr,
  Head,
  Font,
} from "@react-email/components";
import type { SelectPost } from "../db/schema";

type PostInfoProps = {
  posts: SelectPost[];
};

export default function NewPostsNotifyMail({ posts }: PostInfoProps) {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>This Week's New Blog Posts</Preview>
      <Body className="bg-[#1e1e2e] font-sans">
        <Tailwind>
          <Container className="mx-auto p-4 max-w-[600px]">
            <Section className="bg-[#313244] p-5 text-center rounded-t-lg">
              <Text className="text-[#b4befe] text-2xl font-bold m-0">
                This Week's New Blog Posts
              </Text>
            </Section>

            <Section className="bg-[#1e1e2e] p-5 rounded-b-lg">
              <Text className="text-[#cdd6f4] text-base leading-6 mb-2">
                Here are our top blog posts from this week. Enjoy!
              </Text>

              {posts.map((post) => (
                <Section key={post.id} className="mb-6">
                  <Text className="text-[#89b4fa] text-lg font-bold mb-2">
                    {post.title}
                  </Text>
                  <Text className="text-[#cdd6f4] text-base leading-6 mb-4">
                    {post.description}
                  </Text>
                  <Link
                    //pass link
                    href={"https://gmkonan.dev"}
                    className="bg-[#a6e3a1] text-[#1e1e2e] inline-block px-4 py-2 rounded text-sm font-bold no-underline text-center"
                  >
                    Read More
                  </Link>
                </Section>
              ))}

              <Hr className="border-[#45475a] my-6" />
            </Section>
            {/* 
            <Section className="bg-[#1e1e2e] p-5 text-center">
              <Text className="text-[#cdd6f4] text-sm leading-6 mb-2">
                Thank you for subscribing to our newsletter!
              </Text>
              <Text className="text-[#cdd6f4] text-sm leading-6 mb-4">
                Follow us on{" "}
                <Link className="text-[#89b4fa] underline" href="#">
                  Twitter
                </Link>{" "}
                |{" "}
                <Link className="text-[#89b4fa] underline" href="#">
                  Facebook
                </Link>{" "}
                |{" "}
                <Link className="text-[#89b4fa] underline" href="#">
                  LinkedIn
                </Link>
              </Text>
              <Text className="text-[#a6adc8] text-xs leading-5 mt-4">
                You received this email because you subscribed to our
                newsletter.{" "}
                <Link className="text-[#a6adc8] underline" href="#">
                  Unsubscribe here
                </Link>
              </Text>
            </Section> */}
          </Container>
        </Tailwind>
      </Body>
    </Html>
  );
}

NewPostsNotifyMail.PreviewProps = {
  posts: [
    {
      title: "My super cool new post",
      description: "test tsetasda sfasdfgjsldfhjksdhfjkasdhfjk",
    },
    {
      title: "Some dumb post about philosophy thing",
      description:
        "test tsetasda you may have to not use that because idk it sounds so not interesting this is a nice desc but not really",
    },
  ],
};
