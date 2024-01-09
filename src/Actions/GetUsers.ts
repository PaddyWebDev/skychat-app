import prisma from "@/libraries/prismadb";
import getSession from "./GetSession";

export default async function GetUsers() {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    return users;
  } catch (error) {
    return [];
  }
}
