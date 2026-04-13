"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useI18n } from "../../i18n/I18nProvider";

const OrdersMap = () => {
  const { t } = useI18n();
  const orders = useSelector((state) => state.orders.items ?? []);

  const markers = useMemo(
    () =>
      orders.filter(
        (order) =>
          order.location &&
          Number.isFinite(order.location.lat) &&
          Number.isFinite(order.location.lng),
      ),
    [orders],
  );

  return (
    <section className="orders-map">
      <h2 className="orders-map__title">{t("ordersMap")}</h2>
      {markers.length === 0 ? (
        <p className="text-muted">{t("noMapData")}</p>
      ) : (
        <MapContainer
          center={[markers[0].location.lat, markers[0].location.lng]}
          zoom={6}
          scrollWheelZoom
          className="orders-map__container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((order) => (
            <Marker
              key={order.id}
              position={[order.location.lat, order.location.lng]}
            >
              <Popup>
                <strong>{order.title}</strong>
                <br />
                {order.location.address ?? "No address"}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </section>
  );
};

export default OrdersMap;
