"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "../i18n/I18nProvider";

const NavigationMenu = () => {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <div className="navigation-menu">
      <div className="navigation-menu__brand">{t("brand")}</div>
      <nav className="navigation-menu__links">
        <Link
          href="/dashboard"
          className={`navigation-menu__link ${pathname === "/dashboard" ? "navigation-menu__link--active" : ""}`}
        >
          {t("dashboard")}
        </Link>
        <Link
          href="/orders"
          className={`navigation-menu__link ${pathname === "/orders" ? "navigation-menu__link--active" : ""}`}
        >
          {t("orders")}
        </Link>
        <Link
          href="/products"
          className={`navigation-menu__link ${pathname === "/products" ? "navigation-menu__link--active" : ""}`}
        >
          {t("products")}
        </Link>
      </nav>
    </div>
  );
};

export default NavigationMenu;
