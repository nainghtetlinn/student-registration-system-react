import { ThemeProvider } from './theme-provider'
import * as TanStackQueryProvider from '@/providers/query-provider.tsx'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme='dark'>
      <TanStackQueryProvider.Provider>
        {children}
      </TanStackQueryProvider.Provider>
    </ThemeProvider>
  )
}
