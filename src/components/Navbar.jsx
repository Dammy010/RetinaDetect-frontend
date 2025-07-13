import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  const dropdownRef = useRef();
  const mobileRef = useRef();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-700">
          RetinaDetect
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
          <Link to="/predict" className="text-gray-700 hover:text-blue-600">Prediction</Link>

          {!loading && !user && (
            <>
              <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
              <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign Up</Link>
            </>
          )}

          {!loading && user && (
            <>
              <Link to="/history" className="text-gray-700 hover:text-blue-600">History</Link>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-blue-600 font-medium hover:underline"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
                  {user.name}
                  <ChevronDown className="ml-1" size={16} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow rounded w-32 py-2 z-10">
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div
          ref={mobileRef}
          className="md:hidden mt-4 space-y-2 px-6 pb-4 border-t"
        >
          <Link to="/" onClick={closeMobileMenu} className="block text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/about" onClick={closeMobileMenu} className="block text-gray-700 hover:text-blue-600">About</Link>
          <Link to="/predict" onClick={closeMobileMenu} className="block text-gray-700 hover:text-blue-600">Prediction</Link>

          {!loading && !user && (
            <>
              <Link to="/login" onClick={closeMobileMenu} className="block text-blue-600 hover:underline">Login</Link>
              <Link
                to="/signup"
                onClick={closeMobileMenu}
                className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}

          {!loading && user && (
            <>
              <Link
                to="/history"
                onClick={closeMobileMenu}
                className="block text-gray-700 hover:text-blue-600"
              >
                History
              </Link>
              <p className="block text-gray-700 font-medium">{user.name}</p>
              <button
                onClick={() => {
                  logout();
                  closeMobileMenu();
                }}
                className="block w-full text-left text-red-600 hover:underline"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
