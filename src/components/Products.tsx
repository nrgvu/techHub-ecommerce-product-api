import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Pagination,
  Stack,
} from '@mui/material';
import { ShoppingCart, Visibility } from '@mui/icons-material';
import { productsAPI, Product } from '../api/productsAPI';

interface CartItem extends Product {
  quantity: number;
}



const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(6);

  useEffect(() => {
    fetchProducts();
  }, []);

const fetchProducts = async (): Promise<void> => {
  try {
    const response = await productsAPI.getAll();
    
    // console.log('Full API response:', response);
    // console.log('Response.data:', response.data);
    
    //  Type as 'any' to avoid TypeScript errors
    // *************************temperory solution for the response hadling***************************
    const apiResponseData: any = response.data.data;
    const productsData: any[] = apiResponseData.data || [];
    
    console.log('Products array:', productsData);
    console.log('Products count:', productsData.length);
    
    setProducts(productsData);
  } catch (error) {
    console.error('Error fetching products', error);
    setProducts([]);
  } finally {
    setLoading(false);
  }
};

  const addToCart = (product: any): void => {
    try {
      const cartData = localStorage.getItem('cart');
      const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];
      
      const existingItemIndex = cart.findIndex((item) => item.id === product.id);

      if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += 1;
      } else {
        const cartItem: CartItem = { ...product, quantity: 1 };
        cart.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      console.log('Added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  if (loading) {
    return (
      <Container maxWidth='lg'>
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant='h6'>Loading products...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth='lg'>
      <Box sx={{ my: 4 }}>
        <Typography variant='h4' gutterBottom>
          Products ({products.length} items)
        </Typography>

        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: 4,
            mb: 4
          }}
        >
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => {
              if (!product || !product.id) {
                return null;
              }

              return (
                <Card
                  key={product.id}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box
                    sx={{
                      height: '200px',
                      backgroundColor: 'grey.200',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'grey.600',
                      fontSize: '14px',
                    }}
                  >
                    No Image Available
                  </Box>

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant='h6' gutterBottom>
                      {(() => {
                        const title = product.name || 'Unnamed Product';
                        return title.length > 50
                          ? `${title.substring(0, 50)}...`
                          : title;
                      })()}
                    </Typography>

                    <Chip
                      label={product.categoryName || 'No Category'}
                      size='small'
                      sx={{ mb: 1 }}
                    />

                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ mb: 2 }}
                    >
                      {(() => {
                        const description = product.description || 'No description available';
                        return description.length > 100
                          ? `${description.substring(0, 100)}...`
                          : description;
                      })()}
                    </Typography>

                    <Typography variant='h6' color='primary' sx={{ mb: 2 }}>
                      ${parseFloat(String(product.price || 0)).toFixed(2)}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant='outlined'
                        size='small'
                        startIcon={<Visibility />}
                        onClick={() => navigate(`/products/${product.id}`)}
                        sx={{ flex: 1 }}
                      >
                        View
                      </Button>
                      <Button
                        variant='contained'
                        size='small'
                        startIcon={<ShoppingCart />}
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                        sx={{ flex: 1 }}
                      >
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 8 }}>
              <Typography variant='h6'>
                No products found
              </Typography>
            </Box>
          )}
        </Box>

        {totalPages > 1 && (
          <Stack spacing={2} alignItems='center' sx={{ mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color='primary'
              size='large'
              showFirstButton
              showLastButton
            />
            <Typography variant='body2' color='text.secondary'>
              Showing {indexOfFirstProduct + 1}-
              {Math.min(indexOfLastProduct, products.length)} of{' '}
              {products.length} products
            </Typography>
          </Stack>
        )}
      </Box>
    </Container>
  );
};

export default Products;
