import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/Login",
  },
});
export const config = {
  matcher: ["/users/:path*", "/conversations/:path*"],
};
