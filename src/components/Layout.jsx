"use client";

import { usePathname } from "next/navigation";
import NavigationMenu from "./NavigationMenu";
import TopMenu from "./TopMenu";

const Layout = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="app-layout">
      <aside className="app-layout__sidebar">
        <NavigationMenu />
      </aside>
      <div className="app-layout__content">
        <TopMenu />
        <main className="page animate__animated animate__fadeIn" key={pathname}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
