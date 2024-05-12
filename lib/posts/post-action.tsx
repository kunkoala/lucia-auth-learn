import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getTopPosts() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const posts = await prisma.posts.findMany({
    take: 9,
    select: {
      id: true,
      title: true,
      content: true,
      slug: true,
      imageUrl: true,
      createdAt: true,
    },
  });

  return posts;
}

export async function getSinglePost(slug: string, id: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const post = await prisma.posts.findUnique({
    where: {
      id: id,
      slug: slug,
    },
  });

  return post;
}
