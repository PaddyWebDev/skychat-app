import GetCurrentUser from "@/Actions/GetCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libraries/prismadb";
import { pusherServer } from "@/libraries/pusher";

export async function POST(request: Request) {
  try {
    const CurrentUser = await GetCurrentUser();
    const Body = await request.json();
    const { userId, isGroup, members, name } = Body;
    if (!CurrentUser?.id || !CurrentUser.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid Data", { status: 400 });
    }

    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: CurrentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, "conversation:new", newConversation);
        }
      });
      return NextResponse.json(newConversation);
    }
    const ExistingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [CurrentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, CurrentUser.id],
            },
          },
        ],
      },
    });

    const SingleConversation = ExistingConversations[0];
    if (SingleConversation) {
      return NextResponse.json(SingleConversation);
    }

    const NewConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: CurrentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    NewConversation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:new", NewConversation);
      }
    });

    return NextResponse.json(NewConversation);
  } catch (error: any) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
