export const SAMPLE_ADMIN_CREDENTIALS = [
  {
    email: 'admin@eloradesigns.com',
    password: 'EloraAdmin@123',
    role: 'super-admin',
    note: 'Sample only. Create this account in Firebase Authentication before using it.',
  },
]

export const SAMPLE_CATEGORIES = [
  {
    name: 'Dresses',
    description: 'Evening, festive, and occasion-ready silhouettes.',
  },
  {
    name: 'Tops',
    description: 'Luxury essentials for elevated daywear.',
  },
  {
    name: 'Co-ords',
    description: 'Matching boutique sets for polished styling.',
  },
  {
    name: 'Outerwear',
    description: 'Structured layers and statement finishing pieces.',
  },
  {
    name: 'Accessories',
    description: 'Jewelry, handbags, scarves, and boutique accents.',
  },
  {
    name: 'Footwear',
    description: 'Heels, flats, and occasion footwear edits.',
  },
]

export const SAMPLE_PRODUCTS = [
  {
    id: 'sample-product-auric-satin-evening-dress',
    name: 'Auric Satin Evening Dress',
    description:
      'A floor-grazing satin dress with a soft drape, clean neckline, and luminous gold-beige tone.',
    price: 5299,
    category: 'Dresses',
    stock: 8,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
    ],
    createdAt: '2026-05-25T08:00:00.000Z',
  },
  {
    id: 'sample-product-ivory-tailored-wrap-top',
    name: 'Ivory Tailored Wrap Top',
    description:
      'A premium wrap top with fluid sleeves and a flattering structured waistline.',
    price: 2499,
    category: 'Tops',
    stock: 15,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    ],
    createdAt: '2026-05-24T10:30:00.000Z',
  },
  {
    id: 'sample-product-maison-linen-coord-set',
    name: 'Maison Linen Co-ord Set',
    description:
      'A boutique co-ord in soft sand linen with relaxed tailoring and luxe minimal detailing.',
    price: 3899,
    category: 'Co-ords',
    stock: 11,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    ],
    createdAt: '2026-05-23T12:00:00.000Z',
  },
  {
    id: 'sample-product-signature-camel-longline-coat',
    name: 'Signature Camel Longline Coat',
    description:
      'A tailored longline coat with warm neutral tones and refined boutique finishing.',
    price: 6799,
    category: 'Outerwear',
    stock: 5,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
    ],
    createdAt: '2026-05-22T09:45:00.000Z',
  },
  {
    id: 'sample-product-gold-accent-structured-handbag',
    name: 'Gold Accent Structured Handbag',
    description:
      'A compact statement handbag with polished hardware and a refined boutique profile.',
    price: 3199,
    category: 'Accessories',
    stock: 19,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    ],
    createdAt: '2026-05-21T11:10:00.000Z',
  },
  {
    id: 'sample-product-champagne-strap-heels',
    name: 'Champagne Strap Heels',
    description:
      'Minimal strap heels in a champagne finish designed for evening edits and occasion wear.',
    price: 2899,
    category: 'Footwear',
    stock: 14,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80',
    ],
    createdAt: '2026-05-20T14:20:00.000Z',
  },
]

export const SAMPLE_ORDER_STATUSES = [
  'pending',
  'confirmed',
  'shipped',
  'delivered',
  'cancelled',
]

export const SAMPLE_ORDERS = [
  {
    id: 'sample-order-1',
    orderId: 'ELR-240501-A1B2',
    customerName: 'Ananya Mehta',
    phone: '9876543210',
    address: '14 Lakeview Residency, C-Scheme',
    city: 'Jaipur',
    pincode: '302001',
    notes: 'Call before delivery.',
    items: [
      {
        name: 'Auric Satin Evening Dress',
        price: 5299,
        quantity: 1,
      },
      {
        name: 'Gold Accent Structured Handbag',
        price: 3199,
        quantity: 1,
      },
    ],
    totalAmount: 8498,
    orderStatus: 'pending',
    createdAt: '2026-05-25T09:15:00.000Z',
  },
  {
    id: 'sample-order-2',
    orderId: 'ELR-240502-C3D4',
    customerName: 'Rhea Kapoor',
    phone: '9811122233',
    address: '22 Green Park Extension',
    city: 'New Delhi',
    pincode: '110016',
    notes: 'Evening delivery preferred.',
    items: [
      {
        name: 'Maison Linen Co-ord Set',
        price: 3899,
        quantity: 1,
      },
    ],
    totalAmount: 3899,
    orderStatus: 'confirmed',
    createdAt: '2026-05-24T16:40:00.000Z',
  },
]
