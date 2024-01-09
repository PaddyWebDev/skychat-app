import prisma from "@/libraries/prismadb";

import GetCurrentUser from "./GetCurrentUser";

export default async function getConversations() {
  const CurrentUser = await GetCurrentUser();
  if (!CurrentUser?.id) {
    return [];
  }
  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessage: "desc",
      },
      where: {
        userIds: {
          has: CurrentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seenBy: true,
          },
        },
      },
    });

    return conversations;
  } catch (error: any) {
    return [];
  }
}
