"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./page.module.css";
import { ChakraProvider } from "@chakra-ui/react";
// import "./globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>{children}</ChakraProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
