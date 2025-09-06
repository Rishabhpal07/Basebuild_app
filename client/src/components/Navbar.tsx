import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import { LogIn, LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-[#468A9A] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-[#EEEEEE] hover:text-[#9CAFAA]">Basebuild</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>

                  <Link
                  to="/users"
                  className="text-[#EEEEEE] hover:text-[#9CAFAA] pt-2 px-4 py-2 scroll-px-2 rounded-md text-md font-medium"
                  >Find</Link>
                  <Link
                  to="/chat"
                  className="text-[#EEEEEE] hover:text-[#9CAFAA]  py-2 rounded-md text-md font-medium"
                  >Chat</Link>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-indigo-600 px-0 py-2 rounded-md text-sm font-medium"
                >
                  <div className='flex justify-center text-center text-[#EEEEEE] hover:text-[#9CAFAA] gap-1'>
                  <User/>
                  <div className='flex text-center justify-center pt-0.5'>
                  Profile
                  </div>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-[#504B38] text-white px-2 py-2 rounded-md text-sm font-medium hover:bg-[#7D8D86]"
                >
                  <div className='flex gap-1.5'>
                  <LogOut/>
                  <div className='pt-0.5'>
                  Logout
                  </div>
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[#EEEEEE] hover:text-[#9CAFAA] px-3 py-2 rounded-md text-md font-medium"
                >
                  <div className='flex gap-1'>
                    <LogIn/>
                    <div>
                    Login
                    </div>
                  </div>
                </Link>

                <Link
                  to="/register"
                  className="bg-[#504B38] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#7D8D86]"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 