export const metadata = {
  title: "Receipt Maker - Create Receipts Instantly",
  description: "Free receipt maker tool to create professional receipts online."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}