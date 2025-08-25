import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Snackbar,
  Pagination,
  Stack,
  AlertColor,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { productsAPI, Product, CreateProductData, UpdateProductData } from '../api/productsAPI';

// Local interfaces for this component
interface FormData {
  name: string;
  description: string;
  price: string;
  discount: string;
  stock: string;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

// Define error type
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
}

const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [itemsPerPage] = useState<number>(10);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: '',
    discount: '',
    stock: ''
  });

  const showSnackbar = (message: string, severity: AlertColor = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const fetchProducts = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll({ page, limit: itemsPerPage });
      
      console.log('Full API response:', response);
      console.log('Response.data:', response.data);
      
      const data: any = response.data;
      let productsData: any[];
      let totalCount: number;
      
      // Handle different API response structures
      if (data.data && data.data.data && Array.isArray(data.data.data)) {
        // Structure: response.data.data.data (nested)
        productsData = data.data.data;
        totalCount = data.data.total || data.data.count || productsData.length;
      } else if (data.data && Array.isArray(data.data)) {
        // Structure: response.data.data
        productsData = data.data;
        totalCount = data.total || data.count || productsData.length;
      } else if (Array.isArray(data)) {
        // Structure: response.data (direct array)
        productsData = data;
        totalCount = productsData.length;
      } else {
        // Fallback
        console.log('Unexpected data structure:', data);
        productsData = [];
        totalCount = 0;
      }

      console.log('Processed products:', productsData);
      console.log('Total count:', totalCount);

      setProducts(productsData);
      setTotalCount(totalCount);
      setTotalPages(Math.ceil(totalCount / itemsPerPage));
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      showSnackbar('Error fetching products', 'error');
    } finally {
      setLoading(false);
    }
  }, [itemsPerPage]);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [fetchProducts, currentPage]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleOpenDialog = (product?: any): void => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        discount: product.discount?.toString() || '',
        stock: product.stock?.toString() || ''
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        discount: '',
        stock: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      discount: '',
      stock: ''
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
      showSnackbar('Please fill in all required fields (Name, Price)', 'error');
      return;
    }

    try {
      // Use proper interfaces for create/update data (without id)
      const productData: CreateProductData | UpdateProductData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price) || 0,
        discount: parseFloat(formData.discount) || 0,
        stock: parseInt(formData.stock) || 0
      };

      if (editingProduct && editingProduct.id) {
        await productsAPI.update(editingProduct.id, productData);
        showSnackbar('Product updated successfully');
      } else {
        await productsAPI.create(productData);
        showSnackbar('Product created successfully');
      }
      
      fetchProducts(currentPage);  
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving product:', error);
      const apiError = error as ApiError;
      showSnackbar(`Error saving product: ${apiError.response?.data?.message || apiError.message}`, 'error');
    }
  };

  const handleDelete = async (id: any) => {
    if (!id) {
      showSnackbar('Invalid product ID', 'error');
      return;
    }

    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productsAPI.delete(id);
        showSnackbar('Product deleted successfully');
        
        // If we're on the last page and it becomes empty, go to previous page
        if (products.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          fetchProducts(currentPage);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        const apiError = error as ApiError;
        showSnackbar(`Error deleting product: ${apiError.response?.data?.message || apiError.message}`, 'error');
      }
    }
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4">Loading...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">
            Product Management ({totalCount} products)
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Add Product
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products && products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Typography variant="body2">
                        {product.name && product.name.length > 50
                          ? `${product.name.substring(0, 50)}...`
                          : product.name || 'No name'}
                      </Typography>
                    </TableCell>
                    <TableCell>{product.categoryName || 'No category'}</TableCell>
                    <TableCell>${parseFloat(product.price || '0').toFixed(2)}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color: product.stock < 10 ? 'error.main' : 'text.primary',
                          fontWeight: product.stock < 10 ? 'bold' : 'normal'
                        }}
                      >
                        {product.stock || 0}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleOpenDialog(product)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => product.id && handleDelete(product.id)}
                        color="error"
                        disabled={!product.id}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body1" sx={{ py: 3 }}>
                      {loading ? 'Loading products...' : 'No products found. Click "Add Product" to create your first product.'}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {totalPages > 1 && (
          <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
            <Typography variant="body2" color="text.secondary">
              Showing page {currentPage} of {totalPages} ({totalCount} total products)
            </Typography>
          </Stack>
        )}

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <form onSubmit={handleSubmit}>
            <DialogTitle>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                <TextField 
                  required 
                  fullWidth 
                  name="name" 
                  label="Product Name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                />
                <TextField 
                  required 
                  fullWidth 
                  name="description" 
                  label="Description" 
                  multiline 
                  rows={4} 
                  value={formData.description} 
                  onChange={handleInputChange} 
                />
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <TextField 
                    required 
                    sx={{ flex: '1 1 200px' }}
                    name="price" 
                    label="Price ($)" 
                    type="number" 
                    value={formData.price} 
                    onChange={handleInputChange} 
                  />
                  <TextField 
                    sx={{ flex: '1 1 200px' }}
                    name="discount" 
                    label="Discount ($)" 
                    type="number" 
                    value={formData.discount} 
                    onChange={handleInputChange} 
                  />
                </Box>
                <TextField 
                  sx={{ maxWidth: 300 }}
                  name="stock" 
                  label="Stock Quantity" 
                  type="number" 
                  value={formData.stock} 
                  onChange={handleInputChange} 
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button type="submit" variant="contained">
                {editingProduct ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default AdminProducts;