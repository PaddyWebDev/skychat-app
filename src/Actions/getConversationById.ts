import prisma from "@/libraries/prismadb";

import GetCurrentUser from "./GetCurrentUser";
export default async function getConversationById(conversationId: string) {
  try {
    const CurrentUser = await GetCurrentUser();
    if (!CurrentUser?.email) {
      return null;
    }
    const Conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    return Conversation;
  } catch (error: any) {
    return null;
  }
}
