
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    changeEmail: {
      enabled: true,
      updateEmailWithoutVerification: true,
    },
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await prisma.parentAccount.upsert({
            where: {
              authUserId: user.id,
            },
            update: {},
            create: {
              authUserId: user.id,
            },
          });
        },
      },
    },
  },
});
