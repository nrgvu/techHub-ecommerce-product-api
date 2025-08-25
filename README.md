# E-Commerce TypeScript Application

A modern e-commerce web application built with React, TypeScript, and Material-UI, featuring product management, user authentication, and shopping cart functionality.

## Features

- **Product Catalog**: Browse products with pagination and search
- **Product Details**: View detailed product information
- **Admin Dashboard**: Manage products (create, read, update, delete)
- **User Authentication**: Login/logout functionality with protected routes
- **Shopping Cart**: Add items to cart with localStorage persistence
- **Responsive Design**: Mobile-first responsive UI with Material-UI
- **Theme Support**: Dark/light mode toggle
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Frontend**: React 18, TypeScript
- **UI Library**: Material-UI (MUI) v5
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Styling**: Material-UI theming system
- **State Management**: React Context API

## Project Structure

```
src/
├── api/
│   └── productsAPI.ts          # API service layer with TypeScript interfaces
├── components/
│   ├── AdminProducts.tsx       # Product management (CRUD)
│   ├── Login.tsx              # User authentication
│   ├── Products.tsx           # Product catalog
│   ├── ProductDetails.tsx     # Individual product view
│   ├── Register.tsx           # User registration
│   └── ...
├── context/
│   ├── AuthContext.tsx        # Authentication state management
│   └── ThemeContext.tsx       # Theme management
├── config/
│   └── axios.ts              # HTTP client configuration
└── main.tsx                  # Application entry point
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-commerce-product-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Update API base URL in `src/config/axios.ts`
   - Default API endpoint: `https://api.ecommerce.qafdev.com`

4. **Start development server**
   ```bash
   npm run dev
   ```

## API Integration

The application connects to a REST API with the following endpoints:

- `GET /products` - Fetch all products with pagination
- `GET /products/{id}` - Fetch single product
- `POST /products` - Create new product (admin)
- `PUT /products/{id}` - Update product (admin)
- `DELETE /products/{id}` - Delete product (admin)

### API Response Structure

```typescript
{
  "data": {
    "data": Product[],
    "total": number,
    "page": number,
    "limit": number,
    "totalPages": number
  },
  "statusCode": number,
  "timestamp": string,
  "path": string
}
```

## TypeScript Features

### Interfaces

- **Product**: Defines product data structure
- **User**: User authentication data
- **API Response**: Typed API responses
- **Component Props**: All React components have typed props
- **Event Handlers**: Properly typed form and click handlers

### Type Safety

- Strict TypeScript configuration
- No implicit `any` types
- Proper error handling with typed exceptions
- Form validation with typed input handling

## Authentication

The app includes authentication context with:
- User login/logout functionality
- Protected routes for admin features
- JWT token management
- Role-based access control

## State Management

- **AuthContext**: Manages user authentication state
- **ThemeContext**: Handles dark/light mode switching
- **Local State**: Component-level state with React hooks
- **localStorage**: Cart persistence

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Quality

- TypeScript strict mode enabled
- Consistent code formatting
- Component-based architecture
- Separation of concerns (API, UI, state)

## Features in Detail

### Product Management (Admin)
- View all products in a table format
- Create new products with form validation
- Edit existing products
- Delete products with confirmation
- Pagination for large product lists

### Shopping Experience (Customer)
- Browse products in a responsive grid
- View detailed product information
- Add products to cart
- Persistent cart storage
- Out-of-stock indicators

### User Interface
- Material-UI components for consistent design
- Responsive layout for all screen sizes
- Loading states and error handling
- Snackbar notifications for user feedback

## Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

3. **Configure API endpoints** for production environment

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with proper TypeScript typing
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes.
