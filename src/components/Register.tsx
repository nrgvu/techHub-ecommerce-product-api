import authAPI from "../api/authAPI";
import {
    Container, 
    Card, 
    CardContent,
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    Stack
} from '@mui/material'
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { User } from "../api/authAPI";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
}

interface ApiResponse {
    success: boolean;
    error?: string;
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function Register() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    
    // Form states with proper typing
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    // Validation function
    const validateForm = (): boolean => {
        if (!formData.firstName.trim()) {
            setError('First name is required');
            return false;
        }
        if (!formData.lastName.trim()) {
            setError('Last name is required');
            return false;
        }
        if (!formData.email.trim()) {
            setError('Email is required');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    const register = async (userData: Omit<User, 'id' | 'role'>): Promise<ApiResponse> => {
        try {
            const response = await authAPI.register(userData);
            const { user, access_token } = response.data.data;
            
            setUser(user);
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));
            
            setSuccess('Registration successful! Welcome!');
            
            // Clear form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            
            return { success: true };
        } catch (error) {
            const apiError = error as ApiError;
            return {
                success: false,
                error: apiError.response?.data?.message || apiError.message || 'Registration failed',
            };
        }
    };

    // Submit function with proper typing
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setLoading(true);
        setError('');
        setSuccess('');

        // Send firstName and lastName separately (excluding confirmPassword)
        const { firstName, lastName, email, password } = formData;
        const result = await register({ 
            firstName, 
            lastName, 
            email, 
            password,
            
        });
        
        if (!result.success && result.error) {
            setError(result.error);
        }
        
        setLoading(false);
    };

    const logout = () => {
        setUser(null); 
        localStorage.removeItem('token');
        localStorage.removeUser('user');
    };

    const isAdmin = () => user?.role === 'SUPER-ADMIN';
    const isGuest = () => !user;

    // If user is already logged in, show different content
    if (user) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Welcome, {user.firstName} {user.lastName}!
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            You are already logged in.
                        </Typography>
                        <Button 
                            variant="outlined" 
                            onClick={logout}
                            sx={{ mt: 2 }}
                        >
                            Logout
                        </Button>
                    </CardContent>
                </Card>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom textAlign="center" color="primary">
                        Create Account
                    </Typography>
                    
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    
                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {success}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <TextField 
                                variant="outlined" 
                                value={formData.firstName} 
                                name="firstName"
                                onChange={handleChange} 
                                fullWidth 
                                type="text" 
                                label="First Name"
                                required
                                autoComplete="given-name"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        fontSize: '1.2rem',
                                        '& input': {
                                            py: 2
                                        }
                                    },
                                    '& .MuiInputLabel-root': {
                                        fontSize: '1.1rem'
                                    }
                                }}
                            />
                            
                            <TextField 
                                variant="outlined" 
                                value={formData.lastName} 
                                name="lastName"
                                onChange={handleChange} 
                                fullWidth 
                                type="text" 
                                label="Last Name"
                                required
                                autoComplete="family-name"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        fontSize: '1.2rem',
                                        '& input': {
                                            py: 2
                                        }
                                    },
                                    '& .MuiInputLabel-root': {
                                        fontSize: '1.1rem'
                                    }
                                }}
                            />                    
                            
                            <TextField 
                                variant="outlined" 
                                value={formData.email} 
                                name="email" 
                                onChange={handleChange} 
                                fullWidth 
                                type="email" 
                                label="Email Address" 
                                required
                                autoComplete="email"
                            />
                            
                            <TextField 
                                variant="outlined" 
                                value={formData.password} 
                                name="password" 
                                onChange={handleChange} 
                                fullWidth 
                                type="password" 
                                label="Password" 
                                required
                                helperText="Password must be at least 6 characters"
                                autoComplete="new-password"
                            />
                            
                            <TextField 
                                variant="outlined" 
                                value={formData.confirmPassword} 
                                name="confirmPassword" 
                                onChange={handleChange} 
                                fullWidth 
                                type="password" 
                                label="Confirm Password" 
                                required
                                autoComplete="new-password"
                            />
                            
                            <Button
                                type="submit" 
                                fullWidth
                                variant="contained"
                                disabled={loading}
                                sx={{ py: 1.5 }}
                            >
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </Button>
                        </Stack>
                    </Box>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Already have an account?{' '}
                            <Button 
                                variant="text" 
                                sx={{ textTransform: 'none' }}
                                onClick={() => {
                                    // You can add navigation logic here
                                    console.log('Navigate to login');
                                }}
                            >
                                Sign in instead
                            </Button>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

export default Register;