import Layout from "@/components/layout";
import "./globals.css";
import Providers from "./providers";

import ToastProvider from "./providers/ToastProvider";

export default function RootLayout({}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ToastProvider>
            <Layout></Layout>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
