import { CartBag } from '@app/components/CartBag/CartBag';
import { NavBar } from 'app/components/Layout/NavBar/NavBar';
import { Login } from '@app/components/Login/Login';
import testIds from '@app/utils/test-ids';

const Header = () => (
  <header className="fixed top-0 left-0 right-0 bg-white z-40 shadow-sm">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <h2 className="text-xl font-bold">
          <a href="/">EV$NTIX</a>
        </h2>

        <div className="flex items-center space-x-6">
          <Login />
          <CartBag />
          <NavBar />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
