import Logo from '@/assets/tutgi-logo.png'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { paths } from '@/config/paths'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

export const Header = () => {
  const qc = useQueryClient()

  const submitted = qc.getQueryData(['entrance form'])

  return (
    <header className='body-font text-foreground'>
      <div className='container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row'>
        <a className='title-font mb-4 flex items-center font-medium md:mb-0'>
          <img
            src={Logo}
            alt='Logo'
            className='h-12 w-12'
          />
          <span className='ml-3 text-xl'>
            Technological University Taunggyi
          </span>
        </a>
        <nav className='flex flex-wrap items-center justify-center text-base md:ml-auto'>
          {submitted ? (
            <>
              <Button
                asChild
                variant='link'
                size='sm'
              >
                <Link to={paths.student.root.getHref()}>Form</Link>
              </Button>
              <Button
                asChild
                variant='link'
                size='sm'
              >
                <Link to={paths.student.update.root.getHref()}>Update</Link>
              </Button>
            </>
          ) : (
            <Button
              asChild
              variant='link'
              size='sm'
            >
              <Link to={paths.student.register.root.getHref()}>Register</Link>
            </Button>
          )}
        </nav>
        <ModeToggle />
      </div>
    </header>
  )
}
