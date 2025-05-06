import { Footer } from '@/components/themes/pocket/Footer'
import { Header } from '@/components/themes/pocket/Header'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-auto">{children}</main>
      <Footer />
    </>
  )
}
