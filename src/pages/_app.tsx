import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from "@/context/userContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <UserContextProvider>
        <Component {...pageProps} />;
        <div><Toaster /></div>
      </UserContextProvider>
    </ChakraProvider>
  )
}
