import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import AdminProducts from './components/AdminProducts';

const AppContent = () => {
  const { darkMode } = useTheme();

const theme = createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    primary: {
      main: '#6366F1', // Modern indigo
      light: '#818CF8', // Lighter indigo
      dark: '#4F46E5', // Deeper indigo
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#EC4899', // Vibrant pink
      light: '#F472B6', // Light pink
      dark: '#DB2777', // Deep pink
      contrastText: '#FFFFFF',
    },
    background: {
      default: darkMode ? '#0F0F23' : '#FAFBFF', // Rich dark / Clean white
      paper: darkMode ? '#1A1B3A' : '#FFFFFF',
    },
    surface: {
      main: darkMode ? '#252648' : '#F8F9FF',
      elevated: darkMode ? '#2D2E5F' : '#FFFFFF',
    },
    text: {
      primary: darkMode ? '#E2E8F0' : '#1E293B',
      secondary: darkMode ? '#94A3B8' : '#64748B',
      disabled: darkMode ? '#475569' : '#CBD5E1',
    },
    divider: darkMode ? 'rgba(148, 163, 184, 0.12)' : 'rgba(148, 163, 184, 0.08)',
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBf24',
      dark: '#D97706',
    },
    info: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    action: {
      hover: darkMode ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.04)',
      selected: darkMode ? 'rgba(99, 102, 241, 0.16)' : 'rgba(99, 102, 241, 0.08)',
      disabled: darkMode ? 'rgba(148, 163, 184, 0.3)' : 'rgba(148, 163, 184, 0.26)',
      disabledBackground: darkMode ? 'rgba(148, 163, 184, 0.12)' : 'rgba(148, 163, 184, 0.08)',
    },
    // Custom colors for special use cases
    accent: {
      purple: '#A855F7',
      blue: '#3B82F6',
      cyan: '#06B6D4',
      teal: '#14B8A6',
      green: '#10B981',
      yellow: '#EAB308',
      orange: '#F97316',
      red: '#EF4444',
    },
    // Modern gradient palette
    gradient: {
      primary: darkMode 
        ? 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)'
        : 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
      secondary: darkMode
        ? 'linear-gradient(135deg, #F093FB 0%, #F5576C 100%)'
        : 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
      mesh: darkMode
        ? 'radial-gradient(at 40% 20%, hsla(238, 50%, 50%, 0.8) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 0.5) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355, 100%, 60%, 0.5) 0px, transparent 50%)'
        : 'radial-gradient(at 40% 20%, hsla(238, 50%, 70%, 0.5) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189, 100%, 76%, 0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355, 100%, 80%, 0.3) 0px, transparent 50%)',
      aurora: 'linear-gradient(45deg, #FF0080, #FF8C00, #40E0D0, #FF0080)',
      sunset: 'linear-gradient(135deg, #FA709A 0%, #FEE140 100%)',
      ocean: 'linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)',
      forest: 'linear-gradient(135deg, #11998E 0%, #38EF7D 100%)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          fontWeight: 600,
          textTransform: 'none',
          fontSize: '0.95rem',
          padding: '10px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
            transform: 'translateX(-100%)',
            transition: 'transform 0.6s',
          },
          '&:hover::before': {
            transform: 'translateX(100%)',
          },
        },
        contained: {
          background: darkMode 
            ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'
            : 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
          color: '#FFFFFF',
          boxShadow: darkMode
            ? '0 10px 20px -5px rgba(99, 102, 241, 0.35), 0 0 40px -8px rgba(99, 102, 241, 0.25)'
            : '0 10px 20px -5px rgba(99, 102, 241, 0.25), 0 0 25px -5px rgba(99, 102, 241, 0.15)',
          '&:hover': {
            background: darkMode 
              ? 'linear-gradient(135deg, #5558E3 0%, #7C3AED 100%)'
              : 'linear-gradient(135deg, #5558E3 0%, #7C3AED 100%)',
            boxShadow: darkMode
              ? '0 20px 40px -8px rgba(99, 102, 241, 0.5), 0 0 60px -8px rgba(99, 102, 241, 0.3)'
              : '0 20px 40px -8px rgba(99, 102, 241, 0.35), 0 0 35px -5px rgba(99, 102, 241, 0.2)',
            transform: 'translateY(-2px) scale(1.02)',
          },
          '&:active': {
            transform: 'translateY(0) scale(1)',
          },
          '&.MuiButton-containedSecondary': {
            background: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
            boxShadow: darkMode
              ? '0 10px 20px -5px rgba(236, 72, 153, 0.35), 0 0 40px -8px rgba(236, 72, 153, 0.25)'
              : '0 10px 20px -5px rgba(236, 72, 153, 0.25), 0 0 25px -5px rgba(236, 72, 153, 0.15)',
            '&:hover': {
              background: 'linear-gradient(135deg, #DB2777 0%, #EC4899 100%)',
              boxShadow: darkMode
                ? '0 20px 40px -8px rgba(236, 72, 153, 0.5), 0 0 60px -8px rgba(236, 72, 153, 0.3)'
                : '0 20px 40px -8px rgba(236, 72, 153, 0.35), 0 0 35px -5px rgba(236, 72, 153, 0.2)',
            },
          },
        },
        outlined: {
          borderWidth: '2px',
          borderColor: darkMode ? '#6366F1' : '#6366F1',
          color: darkMode ? '#818CF8' : '#6366F1',
          backgroundColor: darkMode ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            borderColor: darkMode ? '#818CF8' : '#4F46E5',
            backgroundColor: darkMode ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)',
            borderWidth: '2px',
            transform: 'translateY(-1px)',
          },
          '&.MuiButton-outlinedSecondary': {
            borderColor: darkMode ? '#EC4899' : '#EC4899',
            color: darkMode ? '#F472B6' : '#EC4899',
            backgroundColor: darkMode ? 'rgba(236, 72, 153, 0.05)' : 'transparent',
            '&:hover': {
              borderColor: darkMode ? '#F472B6' : '#DB2777',
              backgroundColor: darkMode ? 'rgba(236, 72, 153, 0.1)' : 'rgba(236, 72, 153, 0.05)',
            },
          },
        },
        text: {
          color: darkMode ? '#818CF8' : '#6366F1',
          '&:hover': {
            backgroundColor: darkMode ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.05)',
            transform: 'translateX(2px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: darkMode ? 'rgba(15, 15, 35, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: `1px solid ${darkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.08)'}`,
          boxShadow: darkMode
            ? '0 8px 32px rgba(0, 0, 0, 0.4)'
            : '0 8px 32px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          backgroundColor: darkMode ? 'rgba(26, 27, 58, 0.7)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          border: `1px solid ${darkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.08)'}`,
          boxShadow: darkMode
            ? '0 20px 60px -15px rgba(0, 0, 0, 0.6), 0 0 40px -20px rgba(99, 102, 241, 0.15)'
            : '0 20px 60px -15px rgba(0, 0, 0, 0.15), 0 0 25px -10px rgba(99, 102, 241, 0.05)',
          overflow: 'hidden',
          position: 'relative',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: darkMode
              ? 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.4), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent)',
          },
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: darkMode
              ? '0 30px 80px -20px rgba(0, 0, 0, 0.7), 0 0 60px -20px rgba(99, 102, 241, 0.25)'
              : '0 30px 80px -20px rgba(0, 0, 0, 0.2), 0 0 40px -10px rgba(99, 102, 241, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          backgroundColor: darkMode ? 'rgba(26, 27, 58, 0.6)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: `1px solid ${darkMode ? 'rgba(148, 163, 184, 0.08)' : 'rgba(148, 163, 184, 0.06)'}`,
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: darkMode
            ? '0 4px 20px rgba(0, 0, 0, 0.25)'
            : '0 4px 20px rgba(0, 0, 0, 0.04)',
        },
        elevation2: {
          boxShadow: darkMode
            ? '0 8px 30px rgba(0, 0, 0, 0.3)'
            : '0 8px 30px rgba(0, 0, 0, 0.06)',
        },
        elevation3: {
          boxShadow: darkMode
            ? '0 12px 40px rgba(0, 0, 0, 0.35)'
            : '0 12px 40px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: darkMode ? 'rgba(148, 163, 184, 0.05)' : 'rgba(148, 163, 184, 0.03)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '& fieldset': {
              borderColor: darkMode ? 'rgba(148, 163, 184, 0.15)' : 'rgba(148, 163, 184, 0.12)',
              borderWidth: '1.5px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            },
            '&:hover': {
              backgroundColor: darkMode ? 'rgba(99, 102, 241, 0.05)' : 'rgba(99, 102, 241, 0.02)',
              '& fieldset': {
                borderColor: darkMode ? 'rgba(99, 102, 241, 0.4)' : 'rgba(99, 102, 241, 0.3)',
              },
            },
            '&.Mui-focused': {
              backgroundColor: darkMode ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.03)',
              '& fieldset': {
                borderColor: '#6366F1',
                borderWidth: '2px',
                boxShadow: darkMode
                  ? '0 0 0 4px rgba(99, 102, 241, 0.1)'
                  : '0 0 0 4px rgba(99, 102, 241, 0.05)',
              },
            },
          },
          '& .MuiInputLabel-root': {
            color: darkMode ? '#94A3B8' : '#64748B',
            '&.Mui-focused': {
              color: '#6366F1',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          fontWeight: 600,
          fontSize: '0.875rem',
          letterSpacing: '0.025em',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
        filled: {
          background: darkMode
            ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)'
            : 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
          color: darkMode ? '#A5B4FC' : '#6366F1',
          border: `1px solid ${darkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.2)'}`,
          '&:hover': {
            background: darkMode
              ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.25) 100%)'
              : 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
          },
        },
        outlined: {
          borderColor: darkMode ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0.4)',
          color: darkMode ? '#A5B4FC' : '#6366F1',
          '&:hover': {
            backgroundColor: darkMode ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)',
            borderColor: '#6366F1',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backdropFilter: 'blur(8px)',
          border: 'none',
        },
        standardSuccess: {
          backgroundColor: darkMode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)',
          color: darkMode ? '#34D399' : '#059669',
          borderLeft: '4px solid #10B981',
        },
        standardError: {
          backgroundColor: darkMode ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)',
          color: darkMode ? '#F87171' : '#DC2626',
          borderLeft: '4px solid #EF4444',
        },
        standardWarning: {
          backgroundColor: darkMode ? 'rgba(245, 158, 11, 0.15)' : 'rgba(245, 158, 11, 0.1)',
          color: darkMode ? '#FBBf24' : '#D97706',
          borderLeft: '4px solid #F59E0B',
        },
        standardInfo: {
          backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)',
          color: darkMode ? '#60A5FA' : '#2563EB',
          borderLeft: '4px solid #3B82F6',
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            borderRadius: '10px',
            fontWeight: 600,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              backgroundColor: darkMode ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)',
              transform: 'scale(1.1)',
            },
            '&.Mui-selected': {
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
              color: '#FFFFFF',
              boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5558E3 0%, #7C3AED 100%)',
              },
            },
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: darkMode ? 'rgba(148, 163, 184, 0.08)' : 'rgba(148, 163, 184, 0.06)',
          '&::before, &::after': {
            borderColor: darkMode ? 'rgba(148, 163, 184, 0.08)' : 'rgba(148, 163, 184, 0.06)',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: darkMode ? 'rgba(15, 15, 35, 0.95)' : 'rgba(30, 41, 59, 0.95)',
          backdropFilter: 'blur(8px)',
          borderRadius: '8px',
          fontSize: '0.875rem',
          padding: '8px 12px',
          boxShadow: darkMode
            ? '0 10px 30px rgba(0, 0, 0, 0.5)'
            : '0 10px 30px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 52,
          height: 30,
          padding: 0,
          '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 3,
            transitionDuration: '300ms',
            '&.Mui-checked': {
              transform: 'translateX(22px)',
              color: '#fff',
              '& + .MuiSwitch-track': {
                backgroundColor: '#6366F1',
                opacity: 1,
                border: 0,
              },
            },
          },
          '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 24,
            height: 24,
          },
          '& .MuiSwitch-track': {
            borderRadius: 15,
            backgroundColor: darkMode ? '#39393D' : '#E9E9EA',
            opacity: 1,
            transition: 'background-color 300ms',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: '"Inter Variable", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      background: darkMode
        ? 'linear-gradient(135deg, #E2E8F0 0%, #A5B4FC 100%)'
        : 'linear-gradient(135deg, #1E293B 0%, #6366F1 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    h2: {
      fontSize: '2.75rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      color: darkMode ? '#E2E8F0' : '#1E293B',
    },
    h3: {
      fontSize: '2.125rem',
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
      color: darkMode ? '#E2E8F0' : '#1E293B',
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: darkMode ? '#E2E8F0' : '#1E293B',
    },
    h5: {
      fontSize: '1.375rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: darkMode ? '#E2E8F0' : '#1E293B',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: darkMode ? '#E2E8F0' : '#1E293B',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      letterSpacing: '0.01em',
      color: darkMode ? '#94A3B8' : '#64748B',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em',
      color: darkMode ? '#94A3B8' : '#64748B',
    },
    button: {
      fontWeight: 600,
      fontSize: '0.875rem',
      letterSpacing: '0.025em',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      letterSpacing: '0.03em',
      color: darkMode ? '#64748B' : '#94A3B8',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: darkMode ? '#64748B' : '#94A3B8',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    darkMode ? '0 1px 3px rgba(0,0,0,0.4)' : '0 1px 3px rgba(0,0,0,0.12)',
    darkMode ? '0 2px 6px rgba(0,0,0,0.4)' : '0 2px 6px rgba(0,0,0,0.08)',
    darkMode ? '0 3px 8px rgba(0,0,0,0.4)' : '0 3px 8px rgba(0,0,0,0.08)',
    darkMode ? '0 4px 10px rgba(0,0,0,0.4)' : '0 4px 10px rgba(0,0,0,0.08)',
    darkMode ? '0 6px 12px rgba(0,0,0,0.4)' : '0 6px 12px rgba(0,0,0,0.08)',
    darkMode ? '0 8px 16px rgba(0,0,0,0.4)' : '0 8px 16px rgba(0,0,0,0.08)',
    darkMode ? '0 10px 20px rgba(0,0,0,0.4)' : '0 10px 20px rgba(0,0,0,0.08)',
    darkMode ? '0 12px 24px rgba(0,0,0,0.4)' : '0 12px 24px rgba(0,0,0,0.08)',
    darkMode ? '0 16px 32px rgba(0,0,0,0.4)' : '0 16px 32px rgba(0,0,0,0.08)',
    darkMode ? '0 20px 40px rgba(0,0,0,0.4)' : '0 20px 40px rgba(0,0,0,0.08)',
    darkMode ? '0 24px 48px rgba(0,0,0,0.4)' : '0 24px 48px rgba(0,0,0,0.08)',
    darkMode ? '0 32px 64px rgba(0,0,0,0.4)' : '0 32px 64px rgba(0,0,0,0.08)',
  ],
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
});

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route
            path='/login'
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path='/register'
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path='/products'
            element={<Products />}
          />
          <Route
            path='/products/:id'
            element={<ProductDetails />}
          />


    
          <Route path='/' element={<Navigate to='/products' replace />} />

          <Route path='/adminProducts' element={
          <AdminProducts/>
          }
          />

        </Routes>
      </BrowserRouter>
    </MUIThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
          <AppContent />
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;