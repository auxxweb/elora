import { useState } from 'react'
import toast from 'react-hot-toast'
import { FiClock, FiMail, FiMapPin, FiPhoneCall } from 'react-icons/fi'
import Container from '../../components/common/Container'
import SectionHeading from '../../components/common/SectionHeading'
import { BUSINESS_HOURS, SITE_CONFIG } from '../../constants/site'
import { hasFirebaseEnv } from '../../firebase/config'
import { submitContactMessage } from '../../services/contactService'

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

const ContactPage = () => {
  const [formData, setFormData] = useState(initialFormData)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setSubmitting(true)
      await submitContactMessage(formData)
      setFormData(initialFormData)
      toast.success('Your message has been sent successfully.')
    } catch (error) {
      toast.error(error.message || 'Unable to submit your message right now.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container className="space-y-12 py-12">
      <section className="panel-shell">
        <SectionHeading
          eyebrow="Contact Us"
          title="Let’s connect with Elora Designs"
          description="Reach out for product queries, boutique appointments, styling support, or order help. You can use the form below or contact us directly."
        />
        {!hasFirebaseEnv ? (
          <div className="rounded-[1.5rem] border border-[#e8cf8a] bg-[#fff7df] px-4 py-3 text-sm text-[#7a5b16]">
            Demo mode is active. Contact messages are currently stored locally until Firebase is configured.
          </div>
        ) : null}
      </section>

      <section className="grid gap-8 xl:grid-cols-[1fr_0.95fr]">
        <div className="panel-shell">
          <h2 className="font-display text-4xl text-cocoa">Send us a message</h2>
          <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="label-text" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="label-text" htmlFor="phone">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="label-text" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="label-text" htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="label-text" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                className="textarea-field"
                placeholder="Tell us about your product query, order issue, styling request, or visit plan."
                required
              />
            </div>

            <div className="sm:col-span-2">
              <button type="submit" className="btn-primary w-full sm:w-auto" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send message'}
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-8">
          <div className="panel-shell">
            <h2 className="font-display text-4xl text-cocoa">Visit our location</h2>
            <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-sand">
              <iframe
                title="Elora Designs location map"
                src={SITE_CONFIG.mapEmbedUrl}
                className="h-[340px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <div className="panel-shell">
            <h2 className="font-display text-4xl text-cocoa">Contact details</h2>
            <div className="mt-6 space-y-4">
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
                  <p>Call us for orders, boutique visits, or styling support.</p>
                </div>
              </div>
              <div className="flex gap-4 rounded-[1.5rem] border border-sand bg-ivory p-4">
                <FiMail className="mt-1 shrink-0 text-xl text-cocoa" />
                <div className="text-sm leading-7 text-stone-600">
                  <p className="font-semibold text-cocoa">{SITE_CONFIG.supportEmail}</p>
                  <p>Email us for detailed queries and collaborations.</p>
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
        </div>
      </section>
    </Container>
  )
}

export default ContactPage
