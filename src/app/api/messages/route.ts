import GetCurrentUser from "@/Actions/GetCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libraries/prismadb";
import { pusherServer } from "@/libraries/pusher";

export async function POST(request: Request) {
  try {
    const currentUser = await GetCurrentUser();
    const Body = await request.json();
    const { message, image, conversationId } = Body;
    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const NewMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversations: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seenBy: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seenBy: true,
        sender: true,
      },
    });

    const UpdatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessage: new Date(),
        messages: {
          connect: {
            id: NewMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seenBy: true,
          },
        },
      },
    });

    await pusherServer.trigger(conversationId, "messages:new", NewMessage);

    const lastMessage =
      UpdatedConversation.messages[UpdatedConversation.messages.length - 1];

    UpdatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, "conversation:update", {
        id: conversationId,
        messages: [lastMessage],
      });
    });

    return NextResponse.json(NewMessage);
  } catch (error: any) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
