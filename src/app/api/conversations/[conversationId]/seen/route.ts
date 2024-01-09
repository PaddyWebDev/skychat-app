import GetCurrentUser from "@/Actions/GetCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libraries/prismadb";
import { pusherServer } from "@/libraries/pusher";
interface IParams {
  conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await GetCurrentUser();
    const { conversationId } = params;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seenBy: true,
          },
        },
        users: true,
      },
    });
    if (!conversation) {
      return new Response("Invalid Id", { status: 400 });
    }
    const LastMessage = conversation.messages[conversation.messages.length - 1];
    if (!LastMessage) {
      return NextResponse.json(conversation);
    }
    // Update seen of last message
    const UpdatedMessage = await prisma.message.update({
      where: {
        id: LastMessage.id,
      },
      include: {
        sender: true,
        seenBy: true,
      },
      data: {
        seenBy: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    await pusherServer.trigger(currentUser.email, "conversation:update", {
      id: conversationId,
      messages: [UpdatedMessage],
    });

    if (LastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation);
    }

    await pusherServer.trigger(
      conversationId!,
      "message:update",
      UpdatedMessage
    );

    return NextResponse.json(UpdatedMessage);
  } catch (error: any) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
