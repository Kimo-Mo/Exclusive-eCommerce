# Exclusive E-Commerce

A modern, responsive e-commerce website built with vanilla JavaScript, featuring real-time shopping cart functionality, user authentication, and a seamless shopping experience.

![Project Preview](/public/imgs/Exclusive-eCommerce.png)

## Features

- **Product Management**

  - Dynamic product catalog
  - Quick view functionality
  - Advanced filtering and sorting
  - Product categories
  - Flash sales with countdown timer

- **Shopping Features**

  - Real-time shopping cart
  - Wishlist functionality
  - Secure checkout process
  - Order history

- **User Features**
  - User authentication
  - Profile management
  - Responsive design
  - Local storage persistence

## Tech Stack

- HTML5
- CSS3 with Tailwind CSS
- Vanilla JavaScript
- ScrollReveal.js for animations
- Local Storage for data persistence
- Firebase for authentication

## Project Structure

```
exclusive_ecommerce/
├── dist/                  # Production build output
├── public/                # Public assets
│   └── imgs/              # Static images
├── pages/                 # HTML pages
│   ├── cart.html
│   ├── login.html
│   ├── sign-up.html
│   ├── profile.html
│   ├── wish-list.html
│   ├── about.html
│   ├── contact.html
│   ├── checkout.html
│   ├── all-products.html
│   └── product-details.html
├── src/                   # Source files
│   ├── js/               # JavaScript modules
│   │   ├── firebase.js
│   │   ├── main.js
│   │   ├── home.js
│   │   ├── cart.js
│   │   ├── login.js
│   │   ├── sign-up.js
│   │   ├── profile.js
│   │   ├── wish-list.js
│   │   ├── checkout.js
│   │   ├── all-products.js
│   │   ├── product-details.js
│   │   └── fetch-products.js
│   └── style/            # CSS files
│       ├── input.css     # Tailwind CSS input file
│       └── style.css     # Compiled CSS file
├── index.html             # Main entry point
├── package.json           # Project metadata and dependencies
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/Kimo-Mo/Exclusive-ecommerce.git
```

2. Install dependencies:

```bash
npm install
```

3. Run the build process:

```bash
npm run build
```

4. Start the development server:

```bash
npm run preview
```

## Development

### CSS Customization

Modify `src/style/input.css` for styling changes:

```css
:root {
  --primary-color: #bc3939;
  --hover-btn-color: #963232;
  // ...other variables
}
```

### Adding Products

Add new products in `src/js/products.json`:

```json
{
  "id": 1,
  "title": "Product Name",
  "price": 99.99,
  "image": "path/to/image.jpg"
  // ...other properties
}
```

## Responsive Design

- Mobile-first approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## Authentication

- Firebase Authentication for secure user login and registration
- Email and password-based authentication
- Real-time authentication state monitoring
- Protected routes for profile, checkout, and other user-specific pages
- Error handling for invalid credentials, weak passwords, and other authentication issues
- User profile updates, including email and password changes

## Shopping Cart Features

- Real-time updates
- Quantity management
- Price calculations
- Persistent storage

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Kareem Mohamed - [in/Kareem-dev](https://www.linkedin.com/in/kareem-dev/)
