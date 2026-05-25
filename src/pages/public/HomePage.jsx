import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiAward, FiHeart, FiPackage, FiShield, FiTruck } from 'react-icons/fi'
import Container from '../../components/common/Container'
import SectionHeading from '../../components/common/SectionHeading'
import ProductCard from '../../components/common/ProductCard'
import EmptyState from '../../components/common/EmptyState'
import Loader from '../../components/common/Loader'
import BrandMark from '../../components/common/BrandMark'
import SampleDataBanner from '../../components/common/SampleDataBanner'
import { CATEGORY_SHOWCASE, SITE_CONFIG } from '../../constants/site'
import { getFeaturedProducts, getNewArrivals } from '../../services/productService'

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadHomeData = async () => {
      try {
        setLoading(true)
        const [featured, arrivals] = await Promise.all([
          getFeaturedProducts(4),
          getNewArrivals(8),
        ])

        if (isMounted) {
          setFeaturedProducts(featured)
          setNewArrivals(arrivals)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadHomeData()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="pb-10">
      <section className="overflow-hidden border-b border-sand bg-white">
        <Container className="grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mocha/80">
              Elora Designs Signature Edit
            </p>
            <h1 className="max-w-2xl font-display text-5xl leading-tight text-cocoa sm:text-6xl">
              Gold-toned luxury for a polished modern wardrobe.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-stone-600">
              {SITE_CONFIG.description} Discover curated arrivals, elevated silhouettes, and
              signature pieces designed for local fulfilment and cash-on-delivery ordering.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary">
                Explore collection
                <FiArrowRight />
              </Link>
              <Link to="/login" className="btn-secondary">
                Admin login
              </Link>
            </div>
            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              {[
                { icon: FiTruck, label: 'COD ready', text: 'Place orders without online payment' },
                { icon: FiShield, label: 'Managed by boutique', text: 'Track fulfilment from admin panel' },
                { icon: FiPackage, label: 'Smart catalog', text: 'Featured and new arrival sections' },
              ].map((item) => (
                <div key={item.label} className="rounded-[1.75rem] border border-sand bg-ivory p-5">
                  <item.icon className="text-2xl text-cocoa" />
                  <p className="mt-4 text-sm font-semibold text-cocoa">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="relative"
          >
            <div className="absolute -left-8 top-10 hidden h-32 w-32 rounded-full bg-gold-soft/70 blur-3xl lg:block" />
            <div className="rounded-[2.5rem] border border-sand bg-gradient-to-br from-ivory via-white to-gold-soft/45 p-6 shadow-soft sm:p-8">
              <div className="mb-4 rounded-[2rem] border border-white/80 bg-white/85 p-5">
                <BrandMark
                  caption="Luxury fashion crafted with a couture-inspired visual language"
                  imageClassName="h-20 w-20"
                  titleClassName="text-4xl"
                  captionClassName="mt-1 text-xs tracking-[0.32em]"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {CATEGORY_SHOWCASE.map((item, index) => (
                  <div
                    key={item.title}
                    className={`rounded-[2rem] border border-white/70 p-6 ${
                      index === 0 ? 'sm:col-span-2 bg-white/80' : 'bg-white/65'
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mocha/75">
                      {item.category}
                    </p>
                    <h2 className="mt-4 font-display text-3xl text-cocoa">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-stone-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <Container className="space-y-16 py-16">
        <SampleDataBanner />

        <section>
          <SectionHeading
            eyebrow="Signature Pick"
            title="Featured collection"
            description="Highlight your top-performing pieces, limited runs, and hero products in one premium grid."
            action={
              <Link to="/products" className="btn-secondary">
                View all products
              </Link>
            }
          />

          {loading ? (
            <Loader label="Loading featured products..." />
          ) : featuredProducts.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No featured products yet"
              description="Add products from the admin panel and toggle featured items to populate this section."
              action={
                <Link to="/admin/add-product" className="btn-primary">
                  Add first product
                </Link>
              }
            />
          )}
        </section>

        <section className="rounded-[2.5rem] border border-sand bg-cocoa px-6 py-10 text-white shadow-soft sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                Elora Designs Offer
              </p>
              <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
                Elegant style, effortless ordering.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">
                Use the checkout flow to capture local orders with customer notes, address details,
                and COD fulfilment preferences.
              </p>
            </div>
            <Link to="/checkout" className="btn-secondary border-white/20 bg-white/10 text-white hover:bg-white/15">
              Start an order
            </Link>
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Why customers choose Elora Designs"
            description="A dedicated boutique experience built around premium styling, thoughtful service, and easy local ordering."
            align="center"
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: FiAward,
                title: 'Curated Premium Edit',
                description:
                  'Every piece is selected for quality, finish, and a refined luxury look that feels elevated.',
              },
              {
                icon: FiHeart,
                title: 'Boutique Personal Touch',
                description:
                  'We focus on warm, direct customer support rather than a generic mass-market shopping experience.',
              },
              {
                icon: FiTruck,
                title: 'Simple COD Ordering',
                description:
                  'Customers can place orders quickly without online payment friction, making checkout easy and familiar.',
              },
              {
                icon: FiShield,
                title: 'Trusted Local Fulfilment',
                description:
                  'Orders are managed directly by the boutique, with admin-side tracking and careful fulfilment updates.',
              },
            ].map((item) => (
              <article key={item.title} className="panel-shell h-full">
                <item.icon className="text-2xl text-cocoa" />
                <h3 className="mt-5 font-display text-3xl text-cocoa">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-stone-600">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow="New arrivals"
            title="Fresh additions to the catalog"
            description="Recently added products surface here automatically so your storefront always feels current."
          />

          {loading ? (
            <Loader label="Loading new arrivals..." />
          ) : newArrivals.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Your boutique is ready for products"
              description="Once items are created in Firestore from the admin dashboard, this home page will update automatically."
            />
          )}
        </section>
      </Container>
    </div>
  )
}

export default HomePage
