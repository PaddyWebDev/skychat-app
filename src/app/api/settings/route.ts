import GetCurrentUser from "@/Actions/GetCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libraries/prismadb";

export async function POST(request: Request) {
  try {
    const CurrentUser = await GetCurrentUser();
    const Body = await request.json();
    const { name, image } = Body;
    if (!CurrentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const UpdatedUser = await prisma.user.update({
      where: {
        id: CurrentUser.id,
      },
      data: {
        image: image,
        name: name,
      },
    });
    return NextResponse.json(UpdatedUser);
  } catch (error: any) {
    console.log(error, "Settings_Error");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
