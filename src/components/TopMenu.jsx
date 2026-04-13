"use client";

import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSessions } from "../store/sessionSlice";
import { setSearchQuery } from "../store/uiSlice";
import { useI18n } from "../i18n/I18nProvider";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";

const TopMenu = () => {
  const dispatch = useDispatch();
  const { language, setLanguage, t } = useI18n();
  const activeSessions = useSelector((state) => state.session.activeSessions);
  const searchQuery = useSelector((state) => state.ui.searchQuery);
  const [now, setNow] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socket.on("sessions:update", (count) => dispatch(setActiveSessions(count)));
    return () => socket.disconnect();
  }, [dispatch]);

  const formattedDate = useMemo(
    () =>
      now
        ? new Intl.DateTimeFormat("en-GB", {
            weekday: "long",
            day: "2-digit",
            month: "short",
            year: "numeric",
          }).format(now)
        : "--",
    [now],
  );

  const formattedTime = useMemo(
    () =>
      now
        ? new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).format(now)
        : "--:--:--",
    [now],
  );

  return (
    <header className="top-menu">
      <div className="top-menu__search">
        <input
          className="form-control"
          placeholder={t("search")}
          value={searchQuery}
          onChange={(event) => dispatch(setSearchQuery(event.target.value))}
        />
      </div>
      <div className="top-menu__meta">
        <select
          className="form-select form-select-sm"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          <option value="en">EN</option>
          <option value="uk">UK</option>
        </select>
        <div>{formattedDate}</div>
        <div>{formattedTime}</div>
        <div className="top-menu__sessions">{t("activeTabs")}: {activeSessions}</div>
      </div>
    </header>
  );
};

export default TopMenu;
