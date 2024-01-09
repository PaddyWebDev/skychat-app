import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "@/Types";
import { User } from "@prisma/client";

export default function useOtherUsers(
  conversation:
    | FullConversationType
    | {
        users: User[];
      }
) {
  const session = useSession();

  const otherUser = useMemo(() => {
    const CurrentUserEmail = session.data?.user?.email;
    const otherUser = conversation.users.filter(
      (user) => user.email !== CurrentUserEmail
    );

    return otherUser[0];
  }, [session, conversation]);

  return otherUser;
}
