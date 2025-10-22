import { Stamp } from '../stamp'
import { CardHeader, CardTitle, CardDescription } from '../ui/card'

import type { TForm } from '@/types/form'

export const FormCardHeader = ({
  form,
  title,
}: {
  form: TForm
  title: string
}) => {
  return (
    <CardHeader className='text-center'>
      <CardTitle className='leading-6'>နည်းပညာတက္ကသိုလ်(တောင်ကြီး)</CardTitle>
      <CardDescription className='text-card-foreground leading-6'>
        ({form.academicYear})ပညာသင်နှစ်
      </CardDescription>
      <CardTitle className='leading-6'>{title}</CardTitle>
      <Stamp
        url={form.stampUrl}
        id={form.id.toString()}
        className='absolute top-2 left-2'
      />
      <p className='absolute top-2 right-2'>
        <span>{form.code}</span>
        <span>#{form.number}</span>
      </p>
    </CardHeader>
  )
}
