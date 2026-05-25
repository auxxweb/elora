import { Link } from 'react-router-dom'
import { FiClock, FiMapPin, FiPhoneCall } from 'react-icons/fi'
import Container from '../../components/common/Container'
import SectionHeading from '../../components/common/SectionHeading'
import BrandMark from '../../components/common/BrandMark'
import {
  ABOUT_HIGHLIGHTS,
  BOUTIQUE_BENEFITS,
  BUSINESS_HOURS,
  SITE_CONFIG,
} from '../../constants/site'

const AboutPage = () => (
  <div className="pb-12">
    <section className="border-b border-sand bg-white">
      <Container className="grid gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mocha/80">
            About Elora
          </p>
          <h1 className="max-w-3xl font-display text-5xl leading-tight text-cocoa sm:text-6xl">
            A boutique fashion house shaped by elegant details and local luxury.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-stone-600">
            {SITE_CONFIG.description} Elora Designs was created for women who love polished
            dressing, boutique service, and fashion that feels refined from day to evening.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/products" className="btn-primary">
              Explore collection
            </Link>
            <Link to="/contact" className="btn-secondary">
              Contact us
            </Link>
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-sand bg-gradient-to-br from-white via-ivory to-gold-soft/50 p-6 shadow-soft sm:p-8">
          <BrandMark
            caption="Luxury fashion with a signature finish"
            imageClassName="h-20 w-20"
            titleClassName="text-4xl"
          />
          <p className="mt-6 text-sm leading-8 text-stone-600">
            We believe premium style should feel personal, effortless, and memorable. From
            thoughtfully selected occasionwear to refined everyday essentials, every Elora piece is
            chosen to help customers dress with confidence.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {BOUTIQUE_BENEFITS.map((benefit) => (
              <span
                key={benefit}
                className="rounded-full border border-sand bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-mocha/80"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>

    <Container className="space-y-14 py-14">
      <section>
        <SectionHeading
          eyebrow="Our Philosophy"
          title="Why Elora Designs exists"
          description="We build a luxury boutique experience that combines curated style with approachable, local customer care."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {ABOUT_HIGHLIGHTS.map((item) => (
            <article key={item.title} className="panel-shell">
              <h2 className="font-display text-3xl text-cocoa">{item.title}</h2>
              <p className="mt-4 text-sm leading-8 text-stone-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="panel-shell">
          <SectionHeading
            eyebrow="The Elora Experience"
            title="Designed for meaningful boutique shopping"
            description="Every touchpoint is intended to feel refined, warm, and thoughtfully curated."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              'Boutique-selected products that balance statement style and timeless wearability.',
              'A responsive online storefront for browsing, carting, and placing COD orders with ease.',
              'Personalized support through direct contact and local boutique fulfilment.',
              'Elegant fashion presentation inspired by premium design language and editorial retail.',
            ].map((point) => (
              <div key={point} className="rounded-[1.5rem] border border-sand bg-ivory p-5 text-sm leading-7 text-stone-600">
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="panel-shell">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mocha/75">
            Visit Elora
          </p>
          <h2 className="mt-3 font-display text-4xl text-cocoa">Our boutique location</h2>
          <div className="mt-6 space-y-5">
            <div className="flex gap-4 rounded-[1.5rem] border border-sand bg-ivory p-4">
              <FiMapPin className="mt-1 shrink-0 text-xl text-cocoa" />
              <div className="text-sm leading-7 text-stone-600">
                <p className="font-semibold text-cocoa">{SITE_CONFIG.addressLine1}</p>
                <p>{SITE_CONFIG.addressLine2}</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-[1.5rem] border border-sand bg-ivory p-4">
              <FiPhoneCall className="mt-1 shrink-0 text-xl text-cocoa" />
              <div className="text-sm leading-7 text-stone-600">
                <p className="font-semibold text-cocoa">{SITE_CONFIG.supportPhone}</p>
                <p>{SITE_CONFIG.supportEmail}</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-[1.5rem] border border-sand bg-ivory p-4">
              <FiClock className="mt-1 shrink-0 text-xl text-cocoa" />
              <div className="text-sm leading-7 text-stone-600">
                {BUSINESS_HOURS.map((hour) => (
                  <p key={hour}>{hour}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  </div>
)

export default AboutPage
