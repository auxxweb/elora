# Elora Designs

A production-ready boutique fashion eCommerce web application built with React, Vite, Tailwind CSS, Firebase Authentication, Firestore, Firebase Storage, Zustand, Framer Motion, and React Router DOM.

## Included modules

- Customer-facing storefront in the same project
- Protected admin panel in the same project
- Firebase app bootstrap with environment variables
- Firebase Authentication for admin login
- Firestore product and order management
- Firebase Storage multi-image upload
- Zustand cart with localStorage persistence
- Mobile-first responsive boutique UI

## Tech stack

- React + Vite
- Tailwind CSS
- Firebase Authentication
- Firebase Firestore
- Firebase Storage
- React Router DOM
- Zustand
- Framer Motion
- React Icons
- React Hot Toast

## Routes

### Public

- `/` home page
- `/products` all products
- `/product/:id` single product page
- `/cart` cart
- `/checkout` COD order placement
- `/order-success` order confirmation
- `/login` admin login

### Protected admin

- `/admin` dashboard
- `/admin/products` manage products
- `/admin/add-product` add product
- `/admin/edit-product/:id` edit product
- `/admin/orders` manage orders
- `/admin/settings` settings and configuration notes

## Folder structure

```text
src/
  components/
    admin/
    common/
    layout/
  constants/
  context/
  firebase/
  hooks/
  layouts/
  pages/
    admin/
    public/
  routes/
  services/
  store/
  utils/
```

## Environment variables

Copy `.env.example` to `.env` and add your Firebase project values:

```bash
cp .env.example .env
```

Required keys:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_ADMIN_EMAILS=admin@example.com
VITE_PUBLIC_BASE_PATH=/elora-ecommerce/
```

`VITE_ADMIN_EMAILS` accepts a comma-separated allowlist of admin email addresses. If left empty, any authenticated Firebase user can access the admin panel.
`VITE_PUBLIC_BASE_PATH` should match your GitHub repository name when deploying to GitHub Pages. Example: if your repository is `boutique-store`, use `VITE_PUBLIC_BASE_PATH=/boutique-store/`.

## Firebase setup

### 1. Authentication

- Enable `Email/Password` sign-in in Firebase Authentication.
- Create one or more admin users from the Firebase Console.
- Add those emails to `VITE_ADMIN_EMAILS`.

### 2. Firestore collections

Create these collections:

#### `products`

```json
{
  "name": "Linen Occasion Dress",
  "description": "Elegant boutique dress with soft drape and premium finish.",
  "price": 3499,
  "category": "Dresses",
  "stock": 12,
  "featured": true,
  "images": ["https://..."],
  "createdAt": "2026-05-25T07:00:00.000Z"
}
```

#### `orders`

```json
{
  "orderId": "ELR-123456-ABCD",
  "customerName": "Aarohi Jain",
  "phone": "9876543210",
  "address": "12 Lake View Road",
  "city": "Jaipur",
  "pincode": "302001",
  "notes": "Leave at front desk",
  "items": [
    {
      "productId": "firestore-doc-id",
      "name": "Linen Occasion Dress",
      "price": 3499,
      "quantity": 1,
      "image": "https://..."
    }
  ],
  "totalAmount": 3499,
  "orderStatus": "pending",
  "createdAt": "2026-05-25T07:00:00.000Z"
}
```

### 3. Storage

- Product images upload into Firebase Storage under `products/`.
- The returned download URLs are saved inside Firestore product documents.

## Local development

Install dependencies and run the Vite server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

## GitHub Pages compatibility

This project is configured for GitHub Pages deployment:

- Vite uses a repo-aware `base` path from `VITE_PUBLIC_BASE_PATH` or `GITHUB_REPOSITORY`
- React Router uses `HashRouter` to avoid GitHub Pages refresh 404s
- Public assets use `import.meta.env.BASE_URL` or `%BASE_URL%`
- Frontend and admin routes work under hash URLs such as `#/products` and `#/admin/orders`

Example deployed routes:

- `#/`
- `#/products`
- `#/product/sample-product-auric-satin-evening-dress`
- `#/cart`
- `#/checkout`
- `#/login`
- `#/admin`
- `#/admin/orders`

## Security guidance

- Admin routes are guarded in the React app using Firebase Authentication and the configured email allowlist.
- For real production deployment, also enforce admin-only write access in Firebase Security Rules or with custom claims.
- Keep `products` readable to the public storefront.
- Allow public creation of `orders` only if that matches your business flow.

Example Firestore rules starter:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null
        && request.auth.token.email != null
        && request.auth.token.email in ['admin@example.com'];
    }

    match /products/{productId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    match /orders/{orderId} {
      allow create: if true;
      allow read, update, delete: if isAdmin();
    }
  }
}
```

Update the admin email before deploying.

## GitHub Pages deployment

### 1. Push the project to GitHub

Create a GitHub repository and push this project to it.

### 2. Configure environment variables locally

Copy `.env.example` to `.env` and fill in your Firebase values.

Set `VITE_PUBLIC_BASE_PATH` to your repository path:

```env
VITE_PUBLIC_BASE_PATH=/your-repo-name/
```

Example for a repo named `boutique-store`:

```env
VITE_PUBLIC_BASE_PATH=/boutique-store/
```

### 3. Install dependencies

```bash
npm install
```

### 4. Build locally and verify

```bash
npm run build
```

This generates a GitHub Pages-compatible `dist` folder with the correct asset base path.

### 5. Deploy to GitHub Pages

```bash
npm run deploy
```

The deploy script uses `gh-pages -d dist` and publishes the production build to the `gh-pages` branch.

### 6. Enable GitHub Pages in repository settings

In your GitHub repository:

1. Open `Settings`
2. Open `Pages`
3. Under `Build and deployment`, choose `Deploy from a branch`
4. Select the `gh-pages` branch
5. Select the `/ (root)` folder
6. Save

### 7. Test all required routes

After deployment, verify that these routes work and refresh correctly:

- Home: `#/`
- Products: `#/products`
- Product details: `#/product/<id>`
- Cart: `#/cart`
- Checkout: `#/checkout`
- Admin login: `#/login`
- Admin dashboard: `#/admin`
- Orders page: `#/admin/orders`

### 8. Notes for Firebase on GitHub Pages

- Firebase environment variables are compiled into the app at build time through Vite
- Update `.env` locally before running `npm run build` or `npm run deploy`
- Firestore, Auth, and Storage continue to work normally after deployment as long as your Firebase project is configured correctly

### 9. Why this avoids GitHub Pages issues

- `HashRouter` prevents route refresh 404s
- Vite `base` configuration prevents broken script, CSS, and image paths
- `%BASE_URL%` and `import.meta.env.BASE_URL` prevent missing public assets
- The production build is generated before deployment through `predeploy`

## Production notes

- The storefront handles cash-on-delivery only; there is no payment gateway integration.
- The cart persists with Zustand + localStorage.
- Orders default to `pending` and can be moved to `confirmed`, `shipped`, `delivered`, or `cancelled`.
- The admin panel uploads multiple images per product to Firebase Storage.
