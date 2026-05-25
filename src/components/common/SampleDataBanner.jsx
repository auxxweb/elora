import { hasFirebaseEnv } from '../../firebase/config'

const SampleDataBanner = () => {
  if (hasFirebaseEnv) return null

  return (
    <div className="rounded-[1.5rem] border border-[#e8cf8a] bg-[#fff7df] px-4 py-3 text-sm text-[#7a5b16]">
      Showing demo catalog data because Firebase is not configured yet. Add your `.env` values to
      switch the storefront to live Firestore data.
    </div>
  )
}

export default SampleDataBanner
