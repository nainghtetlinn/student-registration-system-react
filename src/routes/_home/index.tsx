import { Footer } from '@/components/layouts/shared/footer'
import { Header } from '@/components/layouts/shared/header'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/')({
  component: App,
})

function App() {
  return (
    <div>
      <div className='bg-gradient-to-br from-green-400 to-blue-600 text-center dark:from-green-700 dark:to-blue-900'>
        <Header />

        <section className='flex h-screen flex-col items-center justify-center'>
          <h2 className='mb-4 text-4xl font-bold text-white md:text-6xl'>
            Student Registration System
          </h2>
          <p className='mb-8 max-w-2xl text-lg text-white/90 md:text-2xl'>
            Easily register students, track attendance, and manage academic
            records all in one place.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  )
}
