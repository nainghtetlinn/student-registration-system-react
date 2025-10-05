import { Header } from '@/components/layouts/shared/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/')({
  component: App,
})

function App() {
  return (
    <div className='min-h-screen'>
      <Header />

      {/* Hero Section */}
      <main className='flex flex-1 flex-col items-center justify-center px-4 text-center'>
        <Card className='w-full max-w-2xl bg-white/80 shadow-lg'>
          <CardContent className='py-10'>
            <h1 className='mb-4 text-4xl font-extrabold text-blue-800 md:text-5xl'>
              Welcome to the University of Excellence
            </h1>
            <p className='mb-8 max-w-2xl text-lg text-gray-700'>
              Empowering students to achieve academic and personal success.
              Register now to begin your journey with us!
            </p>
            <Button
              asChild
              size='lg'
              className='rounded-lg bg-green-600 text-lg font-semibold shadow hover:bg-green-700'
            >
              <Link to='/student/register'>Register</Link>
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className='bg-white py-4 text-center text-sm text-gray-500 shadow-inner'>
        &copy; {new Date().getFullYear()} Technological University Taunggyi. All
        rights reserved.
      </footer>
    </div>
  )
}
