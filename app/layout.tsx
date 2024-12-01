import type { Metadata } from "next";
import "./globals.css";
import Nav from "../pages/Nav";
import Provider from "../pages/Provider"
import { getServerSession } from 'next-auth/next';
// import { authOptions } from './api/auth/[...nextauth]/route';
export const metadata: Metadata = {
  title: "Promptopia",
  description: "Generated and Share AI Genearted prompts",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
        <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
