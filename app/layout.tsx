import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import NavBar from "../components/Shared/NavBar/NavBar";
import Footer from "../components/Shared/Footer/Footer";
import { AvatarProvider } from "../components/Shared/AvatarContext";
import { ThemeProvider } from "../components/Shared/ThemeContext";
import { RegistrationProvider } from "../components/Auth/RegistrationContext";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edutastic – Learning is a game",
  description:
    "Edutastic is a colourful educational mini-game platform for children aged 4–12.",
};

export const viewport: Viewport = {
  themeColor: "#6234e0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark" className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <AvatarProvider>
            <RegistrationProvider>
              <NavBar />
              <div className="flex-1">{children}</div>
              <Footer />
            </RegistrationProvider>
          </AvatarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
