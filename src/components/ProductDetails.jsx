import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Chip,
  Paper,
  Skeleton,
} from '@mui/material';
import {
  ShoppingCart,
  ArrowBack,
} from '@mui/icons-material';
import { productsAPI } from '../api/productsAPI';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(id);
      const data = response.data;

      // Handle different response structures
      let productData;
      if (data.data) {
        productData = data.data;
      } else {
        productData = data;
      }

      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    if (!product) return;

    try {
      // Use localStorage for cart functionality
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      // Show success feedback
      console.log('Added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return (
      <Container maxWidth='lg'>
        <Box sx={{ my: 4 }}>
          <Skeleton variant='text' sx={{ fontSize: '2rem', mt: 2 }} />
          <Skeleton variant='text' sx={{ fontSize: '1rem', mt: 1 }} />
          <Skeleton variant='text' width='60%' sx={{ mt: 1 }} />
        </Box>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth='lg'>
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant='h4' gutterBottom>
            {error || 'Product not found'}
          </Typography>
          <Button
            variant='contained'
            onClick={() => navigate('/products')}
            startIcon={<ArrowBack />}
          >
            Back to Products
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth='lg'>
      <Box sx={{ my: 4 }}>
        {/* Back Button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/products')}
          sx={{ mb: 3 }}
        >
          Back to Products
        </Button>

        <Grid container spacing={4}>
          {/* Product Info Section */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 4 }}>
              <Box>
                <Typography variant='h4' gutterBottom>
                  {product.name || 'Unnamed Product'}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={
                      product.categoryName ||
                      (product.category && typeof product.category === 'object'
                        ? product.category.name
                        : product.category) ||
                      'No Category'
                    }
                    color='primary'
                    variant='outlined'
                  />
                </Box>

                <Typography variant='h5' color='primary' sx={{ mb: 2 }}>
                  ${product.price || '0.00'}
                  {product.discount > 0 && (
                    <Typography
                      component='span'
                      variant='body2'
                      sx={{
                        ml: 2,
                        textDecoration: 'line-through',
                        color: 'text.secondary',
                      }}
                    >
                      $
                      {(
                        parseFloat(product.price) + parseFloat(product.discount)
                      ).toFixed(2)}
                    </Typography>
                  )}
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography variant='body2' color='text.secondary'>
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : 'Out of stock'}
                  </Typography>
                </Box>


                <Typography variant='body1' sx={{ mb: 4 }}>
                  {product.description || 'No description available.'}
                </Typography>

              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductDetails;