import { prisma } from "@/lib/db";
import { GetServerSidePropsContext } from "next";
import { unstable_cache as cache } from "next/cache";

const getCachedPost = cache((slug) => {
  return prisma.post.findUnique({
    where: {
      slug: slug,
    },
  });
});

export default async function PostPage({ params } : GetServerSidePropsContext ) {
  const post = await getCachedPost(params?.slug as string);

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">{post?.title}</h1>
      <p>{post?.content}</p>
    </main>
  );
}
