import React, { ReactNode } from "react";
import Head from "next/head";
import Footer from "./Footer";

// Define the type for the props
interface LayoutProps {
  children: ReactNode;  // This allows any valid React child (e.g., elements, strings, numbers)
  headerStyle?: React.CSSProperties;  // Optional prop for header styling
}
const Layout: React.FC<LayoutProps> = ({ children}) => {
  return (
    <>
      <Head>
        <title>Nest Testing</title>
        <meta name="description" content="Created by Kash" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
