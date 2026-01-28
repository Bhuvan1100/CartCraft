import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <nav className="flex gap-10">
            <button
              onClick={() => navigate('/add-items')}
              className={`relative text-sm font-semibold transition-all duration-200 ${
                isActive('/add-items')
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Add Items
              {isActive('/add-items') && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gray-900 rounded-full"></span>
              )}
            </button>

            <button
              onClick={() => navigate('/added-products')}
              className={`relative text-sm font-semibold transition-all duration-200 ${
                isActive('/added-products')
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Previous Products
              {isActive('/added-products') && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gray-900 rounded-full"></span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
