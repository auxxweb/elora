import { adminEmails, hasFirebaseEnv } from '../../firebase/config'
import { useAuth } from '../../hooks/useAuth'

const AdminSettingsPage = () => {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      <section className="panel-shell">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mocha/75">
          Settings
        </p>
        <h1 className="mt-3 font-display text-4xl text-cocoa">Firebase and admin configuration</h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-stone-600">
          This page surfaces the key operational settings used by the boutique application so the
          storefront and admin panel remain in sync.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="panel-shell">
          <h2 className="font-display text-3xl text-cocoa">Environment setup</h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-stone-600">
            <p>
              Firebase status:{' '}
              <span className="font-semibold text-cocoa">
                {hasFirebaseEnv ? 'Configured' : 'Missing environment variables'}
              </span>
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>`VITE_FIREBASE_API_KEY`</li>
              <li>`VITE_FIREBASE_AUTH_DOMAIN`</li>
              <li>`VITE_FIREBASE_PROJECT_ID`</li>
              <li>`VITE_FIREBASE_STORAGE_BUCKET`</li>
              <li>`VITE_FIREBASE_MESSAGING_SENDER_ID`</li>
              <li>`VITE_FIREBASE_APP_ID`</li>
              <li>`VITE_ADMIN_EMAILS` for allowed admin accounts</li>
            </ul>
          </div>
        </div>

        <div className="panel-shell">
          <h2 className="font-display text-3xl text-cocoa">Admin access</h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-stone-600">
            <p>
              Current session:{' '}
              <span className="font-semibold text-cocoa">{user?.email ?? 'No active admin'}</span>
            </p>
            <p>
              Allowed admins:{' '}
              <span className="font-semibold text-cocoa">
                {adminEmails.length ? adminEmails.join(', ') : 'Any authenticated user'}
              </span>
            </p>
            <p>
              For stronger production security, pair this client-side allowlist with Firebase
              security rules or custom claims before deploying.
            </p>
          </div>
        </div>
      </section>

      <section className="panel-shell">
        <h2 className="font-display text-3xl text-cocoa">Operational notes</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            'Products are stored in Firestore under the products collection.',
            'Customer orders are stored in the orders collection with a pending default status.',
            'Product imagery uploads directly to Firebase Storage and URLs are saved in Firestore.',
          ].map((note) => (
            <div key={note} className="rounded-[1.5rem] border border-sand bg-ivory p-5 text-sm leading-7 text-stone-600">
              {note}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AdminSettingsPage
