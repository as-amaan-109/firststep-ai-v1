"use client";
import { useRouter } from "next/navigation";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Provider, useSelector } from "react-redux";
import store from "@/store/store";
import { useDispatch } from "react-redux";
export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={``}>
        <Provider store={store}>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
