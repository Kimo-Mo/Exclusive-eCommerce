# Exclusive E-Commerce

A modern, responsive e-commerce website built with vanilla JavaScript, featuring real-time shopping cart functionality, user authentication, and a seamless shopping experience.

![Project Preview](/imgs/Exclusive-eCommerce.png)

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

## Project Structure

```
E-Commerce-Website/
├── dist/
│   └── style.css
├── imgs/
│   ├── icons/
│   └── items/
├── js/
│   ├── fetch-products.js
│   ├── main.js
│   ├── home.js
│   └── ...
├── pages/
│   ├── cart.html
│   ├── login.html
│   └── ...
├── src/
│   └── input.css
├── index.html
└── README.md
```

## Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/Kimo-Mo/Exclusive-eCommerce.git
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
npm run watch
```

## Development

### CSS Customization

Modify `src/input.css` for styling changes:

```css
:root {
  --primary-color: #bc3939;
  --hover-btn-color: #963232;
  // ...other variables
}
```

### Adding Products

Add new products in `js/products.json`:

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

- Local storage based authentication
- Session management
- Protected routes for checkout

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

Kareem Mohamed - [in/Kareem-dev](https://linkedin/in/kareem-dev)
