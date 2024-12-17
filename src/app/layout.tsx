import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arvon",
  description: "The best way to communicate with friends with efficiency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}