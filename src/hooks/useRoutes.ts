import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";
import { LogOut, MessageCircle, Users } from "lucide-react";

const useRoutes = () => {
  const pathName = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: MessageCircle,
        active: pathName === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: Users,
        active: pathName === "users",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => signOut(),
        icon: LogOut,
      },
    ],
    [pathName, conversationId]
  );

  return routes;
};
export default useRoutes;
