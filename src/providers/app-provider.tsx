import { Button } from '@/components/ui/button'

import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

import { ThemeProvider } from './theme-provider'
import * as TanStackQueryProvider from '@/providers/query-provider.tsx'
import { useRefreshToken, useUser } from '@/api/lib/auth'
import { useGetProfile } from '@/api/profile/get-profile'

function InnerApp({ children }: { children: React.ReactNode }) {
  useRefreshToken({
    retry: false,
    staleTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 60 * 10,
    refetchIntervalInBackground: true,
  })

  useUser({
    retry: false,
    staleTime: Infinity,
  })

  useGetProfile({
    retry: false,
    staleTime: Infinity,
  })

  return children
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className='flex h-screen w-screen items-center justify-center'>
          <Loader2
            size={40}
            className='animate-spin'
          />
        </div>
      }
    >
      <ErrorBoundary
        fallback={
          <div
            className='flex h-screen w-screen flex-col items-center justify-center text-red-500'
            role='alert'
          >
            <h2 className='text-lg font-semibold'>
              Ooops, something went wrong :({' '}
            </h2>
            <Button
              className='mt-4'
              onClick={() => window.location.assign(window.location.origin)}
            >
              Refresh
            </Button>
          </div>
        }
      >
        <ThemeProvider defaultTheme='dark'>
          <TanStackQueryProvider.Provider>
            <InnerApp>{children}</InnerApp>
          </TanStackQueryProvider.Provider>
        </ThemeProvider>
      </ErrorBoundary>
    </Suspense>
  )
}
