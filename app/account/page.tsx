import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AccountContent from "../../components/Account/AccountContent";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <main className="ed-container ed-page">
          <p role="status">Loading your account…</p>
        </main>
      }
    >
      <AccountDetails />
    </Suspense>
  );
}

async function AccountDetails() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const parentAccount = await prisma.parentAccount.findUnique({
    where: { authUserId: session.user.id },
    select: {
      authUser: {
        select: {
          name: true,
          email: true,
        },
      },
      childProfiles: {
        select: {
          id: true,
          nickname: true,
          ageGroupKey: true,
          avatar: true,
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!parentAccount) {
    throw new Error("Parent account was not found for the authenticated user.");
  }

  return (
    <AccountContent
      parentName={parentAccount.authUser.name}
      parentEmail={parentAccount.authUser.email}
      initialChildProfiles={parentAccount.childProfiles}
    />
  );
}
