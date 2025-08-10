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
import { useState, useEffect } from "react";

function Register() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    // Form states
const [formData, setFormData] = useState({
    firstName: '',        // Changed from 'name'
    lastName: '',         // Added lastName
    email: '',
    password: '',
    confirmPassword: ''
});

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if(token && userData){
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

// UPDATE: Validation function
const validateForm = () => {
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

    const register = async (userData) => {
        try {
            const response = await authAPI.register(userData);
            const { user, access_token } = response.data.data;
            
            setUser(user);
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));
            
            setSuccess('Registration successful! Welcome!');
            
            // Clear form
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message,
            };
        }
    };

// UPDATE: Submit function
const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    setSuccess('');

    // Send firstName and lastName separately
    const { firstName, lastName, email, password } = formData;
    const result = await register({ firstName, lastName, email, password });
    
    if (!result.success) {
        setError(result.error);
    }
    
    setLoading(false);
};
    const logout = () => {
        setUser(null); 
        localStorage.removeItem('token');
        localStorage.removeItem('user');
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
                            Welcome, {user.name}!
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
                                    name="firstName"           // Changed from "name"
                                    onChange={handleChange} 
                                    fullWidth 
                                    type="text" 
                                    label="First Name"        // Changed from "Full Name"
                                    required
                                    autoComplete="given-name"
                                    size="large"
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
                                    name="lastName"           // New field
                                    onChange={handleChange} 
                                    fullWidth 
                                    type="text" 
                                    label="Last Name"         // New field
                                    required
                                    autoComplete="family-name"
                                    size="large"
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