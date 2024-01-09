import getSession from "./GetSession";
import prisma from "@/libraries/prismadb";

export default async function GetCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const CurrentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!CurrentUser) {
      return null;
    }
    return CurrentUser;
  } catch (error: any) {
    return null;
  }
}
