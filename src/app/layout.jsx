import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css'
import '../index.css'
import '../App.css'
import AppProviders from '../providers/AppProviders'
import Layout from '../components/Layout'

export const metadata = {
  title: 'Inventory App',
  description: 'Inventory management test assignment',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppProviders>
          <Layout>{children}</Layout>
        </AppProviders>
      </body>
    </html>
  )
}
