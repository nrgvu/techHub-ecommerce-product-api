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
import {User} from '../api/authAPI'

const Navigation = () => {
  const navigate = useNavigate();
  const [adminMenuAnchor, setAdminMenuAnchor] = useState(null);
  
  const { darkMode, toggleDarkMode } = useTheme();
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/products'); 
  };

  const isAdmin = () => user?.role === 'SUPER_ADMIN';

  return (
    <>
      <AppBar>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>
              E-Commerce App
            </Typography>

            <Button color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <LightMode /> : <DarkMode />}
            </Button>

            {user ? (
              <>
                {isAdmin() ? (
                  <>
                    <Typography variant="body2" sx={{ mr: 2, fontWeight: 600 }}>
                      Welcome Admin, { user.firstName || 'Admin'}!
                    </Typography>

                    <Button 
                      color="inherit" 
                      onClick={() => navigate('/adminProducts')}
                      startIcon={<Dashboard />}
                    >
                      Manage Products
                    </Button>

                    <Button color='inherit' onClick={handleLogout}>
                      <Logout sx={{ mr: 1 }} />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="body2" sx={{ mr: 2, fontWeight: 600 }}>
                      Welcome, {user.firstName || 'User'}!
                    </Typography>

                    <Button color="inherit" onClick={() => navigate('/products')}>
                      Products
                    </Button>

                    <Button color='inherit' onClick={handleLogout}>
                      <Logout sx={{ mr: 1 }} />
                      Logout
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate('/products')}>
                  Products
                </Button>

                <Button color='inherit' onClick={() => navigate('/login')}>
                  <Login sx={{ mr: 1 }} />
                  Login
                </Button>

                <Button color='inherit' onClick={() => navigate('/register')}>
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      <Toolbar />
    </>
  );
};

export default Navigation;