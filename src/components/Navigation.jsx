import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Badge,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  ShoppingCart,
  Person,
  Logout,
  DarkMode,
  LightMode,
  Dashboard,
  Login,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const navigate = useNavigate();
  const [adminMenuAnchor, setAdminMenuAnchor] = useState(null);
  
  // ✅ FIXED: Object destructuring instead of array
  const { darkMode, toggleDarkMode } = useTheme();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  // ✅ ADDED: Missing handleLogout function
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/products'); // Redirect to products after logout
  };

  // ✅ ADDED: Helper to check if user is admin
  const isAdmin = () => user?.role === 'SUPER_ADMIN';

  return (
    <>
      <AppBar>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* App Title */}
            <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>
              E-Commerce App
            </Typography>

            {/* Theme Toggle */}
            <Button color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <LightMode /> : <DarkMode />}
            </Button>

            {/* ✅ UPDATED: Proper conditional rendering based on user status */}
            {user ? (
              // USER IS LOGGED IN
              <>
                {isAdmin() ? (
                  // ✅ USER IS ADMIN
                  <>
                    {/* Admin Greeting */}
                    <Typography variant="body2" sx={{ mr: 2, fontWeight: 600 }}>
                      Welcome Admin, {user.name || user.firstName || 'Admin'}!
                    </Typography>

                    {/* Manage Products Button */}
                    <Button 
                      color="inherit" 
                      onClick={() => navigate('/adminProducts')}
                      startIcon={<Dashboard />}
                    >
                      Manage Products
                    </Button>

                    {/* Admin Logout Button */}
                    <Button color='inherit' onClick={handleLogout}>
                      <Logout sx={{ mr: 1 }} />
                      Logout
                    </Button>
                  </>
                ) : (
                  // ✅ USER IS REGULAR USER (NOT ADMIN)
                  <>
                    {/* User Greeting */}
                    <Typography variant="body2" sx={{ mr: 2, fontWeight: 600 }}>
                      Welcome, {user.name || user.firstName || 'User'}!
                    </Typography>

                    {/* Products Button */}
                    <Button color="inherit" onClick={() => navigate('/products')}>
                      Products
                    </Button>

                    {/* User Logout Button */}
                    <Button color='inherit' onClick={handleLogout}>
                      <Logout sx={{ mr: 1 }} />
                      Logout
                    </Button>
                  </>
                )}
              </>
            ) : (
              // ✅ USER IS GUEST (NOT LOGGED IN)
              <>
                {/* Products Button for Guests */}
                <Button color="inherit" onClick={() => navigate('/products')}>
                  Products
                </Button>

                {/* Login Button */}
                <Button color='inherit' onClick={() => navigate('/login')}>
                  <Login sx={{ mr: 1 }} />
                  Login
                </Button>

                {/* Register Button */}
                <Button color='inherit' onClick={() => navigate('/register')}>
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Add spacing to push content below AppBar */}
      <Toolbar />
    </>
  );
};

export default Navigation;