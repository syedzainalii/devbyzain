import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ParticleBackground from '@/components/ParticleBackground'

export const metadata = {
  title: 'DevbyZain - Premium Website Templates & Custom Design',
  description: 'Buy professional website templates or request custom web design services by DevbyZain. Modern, responsive designs built with React and Next.js.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
        <ParticleBackground particleCount={25} />
        <Navbar />
        <main className="min-h-screen relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}