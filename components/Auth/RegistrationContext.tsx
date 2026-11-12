"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

/*
  Temporary, in-memory registration details (prototype).
  Holds what the Welcome screen needs after "Create account". It is NOT saved
  anywhere and is lost on a full page reload. The password is deliberately
  never stored here.
*/

export type RegistrationDetails = {
  parentName: string;
  email: string;
  childName: string; // may be empty (optional field)
  ageGroup: string;
};

type Ctx = {
  registration: RegistrationDetails | null;
  setRegistration: (r: RegistrationDetails | null) => void;
};

const RegistrationContext = createContext<Ctx>({ registration: null, setRegistration: () => {} });

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [registration, setRegistration] = useState<RegistrationDetails | null>(null);
  return (
    <RegistrationContext.Provider value={{ registration, setRegistration }}>
      {children}
    </RegistrationContext.Provider>
  );
}

export const useRegistration = () => useContext(RegistrationContext);
