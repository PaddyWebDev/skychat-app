// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authOptions } from "@/libraries/authOptions";
import { getServerSession } from "next-auth";
export default async function getSession() {
  return await getServerSession(authOptions);
}
