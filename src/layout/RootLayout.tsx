import { Outlet, Link } from "react-router-dom";
import React from "react";

export default function RootLayout() {
  return (
    <div>
      <nav>
        Lọc khung ( bởi AnGa )
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
