export type ChildProfileSummary = {
  id: string;
  nickname: string;
  ageGroupKey: string;
  avatar: string;
};

export type ChildProfileMutationResult =
  | {
      ok: true;
      profiles: ChildProfileSummary[];
      activeProfileId: string;
    }
  | {
      ok: false;
      message: string;
    };
