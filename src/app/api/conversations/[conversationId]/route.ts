import GetCurrentUser from "@/Actions/GetCurrentUser";
import prisma from "@/libraries/prismadb";
import { pusherServer } from "@/libraries/pusher";
import { NextResponse } from "next/server";

interface IParams {
  conversationId?: string;
}
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const currentUser = await GetCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const ExistingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    if (!ExistingConversation) {
      return new NextResponse("Invalid Id", { status: 400 });
    }

    const DeletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    ExistingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          "conversation:remove",
          ExistingConversation
        );
      }
    });
    return NextResponse.json(DeletedConversation);
  } catch (error: any) {
    console.log(error, "Error_Conversation_Delete");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
