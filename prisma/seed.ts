import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const initialPosts: Prisma.PostCreateInput[] = [
    {
        title: 'Post 1',
        slug: 'post-1',
        content: 'my post content',
        author: {
            //Since we cleared the database, it don't have any users, so connectOrCreate will either connect to an existing user or create one if it doesn't exists already.
            connectOrCreate: {
                where: {
                    email: "johmn@gmail.com"
                },
                //values of fields of created User if it doesn't exists. 
                create: {
                    email: "johmn@gmail.com",
                    hashedPassword: "jaskdjf394u5"
                }
            }
        }
    }
]

async function main() {
  console.log("start seeding...");

  for(const post of initialPosts){
    const newPost = await prisma.post.create({
        data: post,
    });
    console.log(`Created post with id: ${newPost.id}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })