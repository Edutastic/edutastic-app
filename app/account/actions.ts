"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { ageGroups } from "../../lib/sampleData";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { CHILD_PROFILE_AVATARS } from "../../lib/child-profiles/constants";
import type {
  ChildProfileMutationResult,
  ChildProfileSummary,
} from "../../lib/child-profiles/types";

type ParentResult =
  | { ok: true; parentId: string }
  | { ok: false; message: string };

type ChildProfileInput = {
  nickname: string;
  ageGroupKey: string;
  avatar: string;
};

async function getParentId(): Promise<ParentResult> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { ok: false, message: "Your session has expired. Please sign in again." };
  }

  const parentAccount = await prisma.parentAccount.findUnique({
    where: { authUserId: session.user.id },
    select: { id: true },
  });

  if (!parentAccount) {
    return { ok: false, message: "The parent account could not be found." };
  }

  return { ok: true, parentId: parentAccount.id };
}

function parseProfileInput(formData: FormData): ChildProfileInput | string {
  const nickname = formData.get("nickname");
  const ageGroupKey = formData.get("ageGroupKey");
  const avatar = formData.get("avatar");

  if (
    typeof nickname !== "string" ||
    typeof ageGroupKey !== "string" ||
    typeof avatar !== "string"
  ) {
    return "Complete all child profile fields.";
  }

  const normalizedNickname = nickname.trim();
  if (!normalizedNickname || normalizedNickname.length > 50) {
    return "Enter a child name between 1 and 50 characters.";
  }

  if (!ageGroups.some((group) => group.value === ageGroupKey)) {
    return "Choose a valid age group.";
  }

  if (!CHILD_PROFILE_AVATARS.some((candidate) => candidate === avatar)) {
    return "Choose an available avatar.";
  }

  return {
    nickname: normalizedNickname,
    ageGroupKey,
    avatar,
  };
}

async function listProfiles(parentId: string): Promise<ChildProfileSummary[]> {
  return prisma.childProfile.findMany({
    where: { parentId },
    select: {
      id: true,
      nickname: true,
      ageGroupKey: true,
      avatar: true,
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function createChildProfile(
  formData: FormData,
): Promise<ChildProfileMutationResult> {
  const parent = await getParentId();
  if (!parent.ok) {
    return parent;
  }

  const input = parseProfileInput(formData);
  if (typeof input === "string") {
    return { ok: false, message: input };
  }

  const profile = await prisma.childProfile.create({
    data: {
      parentId: parent.parentId,
      nickname: input.nickname,
      ageGroupKey: input.ageGroupKey,
      avatar: input.avatar,
    },
    select: { id: true },
  });

  const profiles = await listProfiles(parent.parentId);
  revalidatePath("/account");

  return { ok: true, profiles, activeProfileId: profile.id };
}

export async function updateChildProfile(
  profileId: string,
  formData: FormData,
): Promise<ChildProfileMutationResult> {
  const parent = await getParentId();
  if (!parent.ok) {
    return parent;
  }

  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(profileId)) {
    return { ok: false, message: "That child profile could not be found." };
  }

  const input = parseProfileInput(formData);
  if (typeof input === "string") {
    return { ok: false, message: input };
  }

  const result = await prisma.childProfile.updateMany({
    where: {
      id: profileId,
      parentId: parent.parentId,
    },
    data: input,
  });

  if (result.count !== 1) {
    return { ok: false, message: "That child profile could not be found." };
  }

  const profiles = await listProfiles(parent.parentId);
  revalidatePath("/account");

  return { ok: true, profiles, activeProfileId: profileId };
}
