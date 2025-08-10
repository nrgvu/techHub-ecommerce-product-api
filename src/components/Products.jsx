import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Box,
  Chip,
  Pagination,
  Stack,
  Grow,
} from '@mui/material';
import { ShoppingCart, Visibility } from '@mui/icons-material';
import { productsAPI } from '../api/productsAPI';


const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);


  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try{
        const response = await productsAPI.getAll();
        const data = response.data;

        let productsData;
        if(data.data.data && data.data){
            productsData = response.data.data.data;
        }else if(data.data){
            productsData = response.data.data;
        }
        else{
            productsData = response.data;
        }

        const products = Array.isArray(productsData) ? productsData : [];
        setProducts(products);
    }catch(error) {
        console.error('Error fetching products', error);
        setProducts([]);
        
    }finally{
        setLoading(false);
    }

};

const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

const currentProducts  = Array.isArray(products) ? products.slice(indexOfFirstProduct, indexOfLastProduct) : [];

const totalPages = Math.ceil((products?.length || 0) / productsPerPage);

const handlePageChange = (event, value) => {
    setCurrentPage(value)
};







    


  return (
       <Container maxWidth='lg' >
      <Box sx={{ my: 4 }}>
        <Typography variant='h4' gutterBottom >
          Products ({products?.length || 0} items)
        </Typography>


        <Grid container spacing={4} >
          {currentProducts && currentProducts.length > 0 ? (
            currentProducts.map((product) => {
              // Safety check for product object
              if (!product || !product.id) {
                return null;
              }

              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}  >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {product.primaryImage || product.image ? (
                      <CardMedia
                        component='img'
                        height='200'
                        image={product.primaryImage || product.image}
                        alt={product.name || product.title}
                        sx={{ objectFit: 'cover' }}
                      />
                    ) : (
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
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant='h6' gutterBottom>
                        {(() => {
                          const title =
                            product.name || product.title || 'Unnamed Product';
                          return title.length > 50
                            ? `${title.substring(0, 50)}...`
                            : title;
                        })()}
                      </Typography>

                      <Chip
                        label={
                          product.categoryName ||
                          (product.category &&
                          typeof product.category === 'object'
                            ? product.category.name
                            : product.category) ||
                          'No Category'
                        }
                        size='small'
                        sx={{ mb: 1 }}
                      />

                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{ mb: 2 }}
                      >
                        {(() => {
                          const description =
                            product.description || 'No description available';
                          return description.length > 100
                            ? `${description.substring(0, 100)}...`
                            : description;
                        })()}
                      </Typography>

                      <Typography variant='h6' color='primary' sx={{ mb: 2 }}>
                        ${product.price || '0.00'}
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
                          sx={{ flex: 1 }}
                        >
                          Add to Cart
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Grid size={{ xs: 12 }}>
              <Typography variant='h6' align='center' sx={{ mt: 4 }}>
                {loading ? 'Loading products...' : 'No products found'}
              </Typography>
            </Grid>
          )}
        </Grid>

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
              {Math.min(indexOfLastProduct, products?.length || 0)} of{' '}
              {products?.length || 0} products
            </Typography>
          </Stack>
        )}

        {(products?.length || 0) === 0 && (
          <Typography variant='h6' align='center' sx={{ mt: 4 }}>
            No products found
          </Typography>
        )}
      </Box>
    </Container>
  )

}

export default Products;