import { headers } from "next/headers";
import { auth } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return Response.json({ message: "Authentication required." }, { status: 401 });
  }

  const parentAccount = await prisma.parentAccount.findUnique({
    where: { authUserId: session.user.id },
    select: { id: true },
  });

  if (!parentAccount) {
    return Response.json({ message: "Parent account not found." }, { status: 403 });
  }

  const profiles = await prisma.childProfile.findMany({
    where: { parentId: parentAccount.id },
    select: {
      id: true,
      nickname: true,
      ageGroupKey: true,
      avatar: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return Response.json(profiles);
}
