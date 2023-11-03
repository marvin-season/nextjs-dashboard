import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import StyledComponentsRegistry from "./lib/AntdRegistry";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
