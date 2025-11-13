import { Outlet, Link } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
      <nav>
        {/* link sẽ mở tab khác */}
        Lọc khung ( bởi <Link
          target="_blank" rel="noopener noreferrer"
          to="https://projecttoolonline.vercel.app/">
          AnGa </Link> )
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
