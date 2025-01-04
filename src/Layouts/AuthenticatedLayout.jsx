import { Outlet } from "react-router-dom";

const AuthenticatedLayout = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/explore">Explore</a></li>
            <li><a href="/broadcasts">Broadcasts</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/donate">Donate</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
