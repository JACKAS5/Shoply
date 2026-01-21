# Shoply E-Commerce Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

A scalable, modular e-commerce web application demonstrating modern frontend development practices with vanilla JavaScript.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Data Models](#data-models)
- [User Flows](#user-flows)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

Shoply is a comprehensive e-commerce platform built entirely with vanilla HTML5, CSS3, and JavaScript (ES6+). The application showcases enterprise-level frontend architecture through modular design, responsive layouts, and client-side data persistence. It serves as both a functional e-commerce solution and a reference implementation for scalable web applications.

The platform implements a complete shopping experience including product catalog management, shopping cart functionality, user authentication, and administrative controls. Its modular architecture facilitates easy migration to modern frameworks like React or Vue.js.

## Key Features

### Customer Features
- **Product Catalog**: Dynamic product browsing with search and filtering capabilities
- **Shopping Cart**: Persistent cart management with quantity controls and real-time updates
- **User Authentication**: Simulated login/logout system with role-based access
- **Product Details**: Comprehensive product information display
- **Responsive Design**: Optimized user experience across all device sizes
- **Toast Notifications**: User feedback system for actions and errors

### Administrative Features
- **POS Dashboard**: Point-of-sale interface for order management
- **Product Management**: CRUD operations for product inventory
- **Sales Analytics**: Order tracking and revenue reporting
- **Inventory Control**: Stock level monitoring and management

### Technical Features
- **Client-Side Persistence**: LocalStorage-based data storage
- **Modular Architecture**: Component-based CSS and JavaScript organization
- **Scalable Design**: Framework-ready code structure
- **Performance Optimized**: Efficient rendering and state management

## Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **HTML5** | Semantic markup and document structure | Latest |
| **CSS3** | Responsive styling and design system | Latest |
| **JavaScript** | Client-side logic and interactivity | ES6+ |
| **LocalStorage** | Client-side data persistence | Web API |

### Design System
- **Color Palette**: Centralized CSS custom properties
- **Typography**: Poppins and Roboto font families
- **Component Library**: Reusable UI components
- **Responsive Grid**: Flexible layout system

## Architecture

### Modular Design Principles
- **Separation of Concerns**: Distinct layers for structure, presentation, and behavior
- **Component-Based**: Reusable UI components and page-specific modules
- **Scalable Structure**: Easy to extend and maintain codebase
- **Framework Migration Ready**: Clean separation facilitating React/Vue adoption

### CSS Architecture
- **Base Layer**: Global resets, typography, and utility classes
- **Component Layer**: Reusable UI components (cards, buttons, navigation)
- **Page Layer**: Page-specific styling overrides
- **Variable System**: Centralized design tokens for consistency

### JavaScript Architecture
- **Module Pattern**: Encapsulated functionality per feature
- **Event-Driven**: DOM manipulation through event listeners
- **State Management**: Centralized data handling with LocalStorage
- **Error Handling**: Graceful degradation and user feedback

## Data Models

### Product Model
```javascript
{
  id: number,           // Unique identifier
  name: string,         // Product name
  category: string,     // Product category
  price: number,        // Unit price
  image: string,        // Image path
  inStock: boolean      // Availability status
}
```

### Cart Item Model
```javascript
{
  id: number,           // Product ID reference
  name: string,         // Product name
  price: number,        // Unit price
  qty: number           // Quantity in cart
}
```

### User Model
```javascript
{
  username: string,     // Login identifier
  password: string,     // Authentication credential
  role: string          // Access level (user/admin)
}
```

## User Flows

### Customer Journey
1. **Authentication**: User login/signup process
2. **Product Discovery**: Browse catalog with search/filter options
3. **Product Selection**: View detailed product information
4. **Cart Management**: Add/modify/remove items with quantity controls
5. **Checkout Process**: Review and submit orders

### Administrative Workflow
1. **Dashboard Access**: Admin login and dashboard entry
2. **Inventory Management**: Add, edit, or remove products
3. **Order Processing**: Review submitted orders and update status
4. **Analytics Review**: Monitor sales performance and inventory levels

## Project Structure

```
shoply/
├── index.html                    # Home page
├── products.html                 # Product catalog
├── product-detail.html           # Individual product view
├── cart.html                     # Shopping cart
├── login.html                    # User authentication
├── signup.html                   # User registration
├── contact.html                  # Contact information
├── DESIGN.md                     # Design system documentation
├── readme.md                     # Project README
├── project.MD                    # This documentation
├── css/
│   ├── base.css                  # Global styles and resets
│   ├── variables.css             # Design system variables
│   ├── components/
│   │   ├── navbar.css            # Navigation component
│   │   ├── pagination.css        # Pagination controls
│   │   ├── product-card.css      # Product display cards
│   │   ├── toast.css             # Notification system
│   │   └── toast.js              # Toast functionality
│   └── pages/
│       ├── home.css              # Home page styles
│       ├── products.css          # Product catalog styles
│       ├── cart.css              # Cart page styles
│       ├── login.css             # Login page styles
│       ├── signup.css            # Signup page styles
│       ├── product-detail.css    # Product detail styles
│       └── contact.css           # Contact page styles
├── js/
│   ├── main.js                   # Shared utilities
│   ├── home.js                   # Home page logic
│   ├── products.js               # Product catalog logic
│   ├── product-detail.js         # Product detail logic
│   └── cart.js                   # Cart management logic
└── images/
    └── logo.png                  # Application logo
```

## Development

### Prerequisites
- Modern web browser with ES6+ support
- Text editor or IDE (VS Code recommended)
- Local web server (optional, for advanced features)

### Local Setup
1. Clone the repository
2. Open `index.html` in a web browser
3. For development, use a local server to avoid CORS issues

### Code Organization
- **HTML**: Semantic structure with accessibility considerations
- **CSS**: Modular stylesheets with BEM-like naming conventions
- **JavaScript**: Functional programming patterns with clear separation

### Best Practices Implemented
- Semantic HTML5 elements
- CSS custom properties for theming
- Event delegation for dynamic content
- LocalStorage abstraction layer
- Error boundary patterns

## Deployment

### Static Hosting
The application is designed for static hosting platforms:
- **GitHub Pages**: Direct deployment from repository
- **Netlify**: Automated builds and hosting
- **Vercel**: Serverless deployment platform

### Build Process
No build step required - pure static files ready for deployment.

### Environment Configuration
- All configuration managed through JavaScript constants
- No environment-specific build requirements
- Client-side only - no server dependencies

## Contributing

### Development Guidelines
1. Follow existing code organization patterns
2. Maintain responsive design principles
3. Ensure cross-browser compatibility
4. Add appropriate error handling
5. Update documentation for significant changes

### Code Style
- Use ES6+ features consistently
- Maintain consistent naming conventions
- Add JSDoc comments for complex functions
- Follow CSS custom property usage for theming

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Shoply** - Demonstrating scalable frontend architecture with modern web standards.