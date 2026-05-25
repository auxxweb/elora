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
```

`VITE_ADMIN_EMAILS` accepts a comma-separated allowlist of admin email addresses. If left empty, any authenticated Firebase user can access the admin panel.

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

## Deployment guide

You can deploy the built app to Firebase Hosting, Vercel, Netlify, or any static host.

### Option 1: Firebase Hosting

```bash
npm run build
firebase login
firebase init hosting
firebase deploy
```

When prompted during Hosting setup:

- use `dist` as the public directory
- configure as a single-page app: `yes`
- do not overwrite your existing `index.html`

### Option 2: Vercel / Netlify

- Build command: `npm run build`
- Output directory: `dist`
- Add all `VITE_FIREBASE_*` and `VITE_ADMIN_EMAILS` environment variables in the hosting dashboard
- Configure SPA rewrites so all routes serve `index.html`

## Production notes

- The storefront handles cash-on-delivery only; there is no payment gateway integration.
- The cart persists with Zustand + localStorage.
- Orders default to `pending` and can be moved to `confirmed`, `shipped`, `delivered`, or `cancelled`.
- The admin panel uploads multiple images per product to Firebase Storage.
