import { Outlet } from "react-router-dom";

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
