import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  Container,
  Typography,
  Button,
  Box,
  Chip,
  Paper,
  Skeleton,
} from '@mui/material';
import {
  ArrowBack,
} from '@mui/icons-material';
import { productsAPI, Product } from '../api/productsAPI';

interface CartItem extends Product {
  quantity: number;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProduct();
    } else {
      setError('Product ID not found');
      setLoading(false);
    }
  }, [id]);

  const fetchProduct = async (): Promise<void> => {
    if (!id) return;

    try {
      setLoading(true);
      const productId = parseInt(id);
      
      if (isNaN(productId)) {
        setError('Invalid product ID');
        return;
      }

      const response = await productsAPI.getById(productId);
      const productData: Product = response.data;
      setProduct(productData);
      setError(null);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (): void => {
    if (!product) return;

    try {
      // Get existing cart from localStorage
      const cartData = localStorage.getItem('cart');
      const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];
      
      // Check if item already exists in cart
      const existingItemIndex = cart.findIndex((item) => item.id === product.id);

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        cart[existingItemIndex].quantity += 1;
      } else {
        // Add new item to cart
        const cartItem: CartItem = { ...product, quantity: 1 };
        cart.push(cartItem);
      }

      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Show success feedback (you could replace with a snackbar)
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

        {/* Product Details */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Paper elevation={2} sx={{ p: 4 }}>
            <Box>
              <Typography variant='h4' gutterBottom>
                {product.name || 'Unnamed Product'}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Chip
                  label={product.categoryName || 'No Category'}
                  color='primary'
                  variant='outlined'
                />
              </Box>

              <Typography variant='h5' color='primary' sx={{ mb: 2 }}>
                ${product.price ? product.price.toFixed(2) : '0.00'}
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
                    ${(product.price + product.discount).toFixed(2)}
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

              {/* Add to Cart Button */}
              <Button
                variant='contained'
                size='large'
                onClick={addToCart}
                disabled={product.stock === 0}
                sx={{ mt: 2 }}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetails;