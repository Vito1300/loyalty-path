import { Outlet, ScrollRestoration } from 'react-router-dom';
import { CartDrawer } from './CartDrawer';
import { Footer } from './Footer';
import { Header } from './Header';
import { Toast } from './Toast';

export function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Перейти до вмісту
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
      {/* Restores scroll on back/forward and scrolls to #hash targets on navigation. */}
      <ScrollRestoration />
    </>
  );
}
