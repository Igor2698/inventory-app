"use client";

import dynamic from "next/dynamic";

const OrdersMap = dynamic(() => import("../components/maps/OrdersMap"), {
  ssr: false,
  loading: () => <p className="text-muted">Loading map...</p>,
});

const MapPage = () => {
  return (
    <div className="animate__animated animate__fadeIn">
      <OrdersMap />
    </div>
  );
};

export default MapPage;
