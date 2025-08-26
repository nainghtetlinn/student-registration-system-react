import { nrcStates, nrcTownships, nrcTypes } from '@/assets/NRC_Data.min.json'

import { FormInputField, FormSelectField } from '@/components/ui/form-fields'
import { Label } from '@radix-ui/react-label'

import { type NrcTownship } from '@/types/nrc'
import { useEffect, useMemo, useRef } from 'react'
import {
  useFormContext,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'

export const NrcInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  stateCodeName,
  townshipCodeName,
  nrcTypeName,
  nrcNumberName,
}: {
  control: Control<TFieldValues>
  stateCodeName: TName
  townshipCodeName: TName
  nrcTypeName: TName
  nrcNumberName: TName
}) => {
  const oldRef = useRef<string>('')

  const form = useFormContext()

  const watchedStateCode = form.watch(stateCodeName)
  const stateCodeField = form.getFieldState(stateCodeName, form.formState)
  const townshipCodeField = form.getFieldState(townshipCodeName, form.formState)
  const nrcTypeField = form.getFieldState(nrcTypeName, form.formState)
  const nrcNumberField = form.getFieldState(nrcNumberName, form.formState)

  const uniqueTownships = useMemo(() => {
    const seen = new Set()
    const unique: NrcTownship[] = []

    nrcTownships
      .filter((ts) => ts.stateId === watchedStateCode && ts.short.en !== '-')
      .forEach((ts) => {
        if (!seen.has(ts.short.en)) {
          seen.add(ts.short.en)
          unique.push(ts)
        }
      })

    return unique
  }, [watchedStateCode])

  useEffect(() => {
    if (oldRef.current && oldRef.current !== watchedStateCode) {
      form.resetField(townshipCodeName)
    }

    oldRef.current = watchedStateCode
  }, [watchedStateCode])

  return (
    <div className='grid gap-2'>
      <Label
        data-error={
          !!stateCodeField.error ||
          !!townshipCodeField.error ||
          !!nrcTypeField.error ||
          !!nrcNumberField.error
        }
        className='data-[error=true]:text-destructive flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50'
      >
        နိုင်ငံသားစိစစ်ရေးကတ်ပြားအမှတ်
      </Label>

      <div className='flex items-center gap-1'>
        <FormSelectField
          control={control}
          name={stateCodeName}
          hideErrorMessage
          placeholder='State'
          items={nrcStates.filter((s) => s.number.en !== '9*')}
          keyExtractor={(item) => item.id}
          labelExtractor={(item) => item.number.mm}
        />
        <FormSelectField
          control={control}
          name={townshipCodeName}
          hideErrorMessage
          placeholder='Township'
          disabled={uniqueTownships.length === 0}
          items={uniqueTownships.sort((a, b) =>
            a.short.mm.localeCompare(b.short.mm),
          )}
          keyExtractor={(item) => item.id}
          labelExtractor={(item) => item.short.mm}
        />
        <FormSelectField
          control={control}
          name={nrcTypeName}
          hideErrorMessage
          placeholder='Type'
          items={nrcTypes}
          keyExtractor={(item) => item.id}
          labelExtractor={(item) => item.name.mm}
        />
      </div>

      <FormInputField
        control={control}
        name={nrcNumberName}
        hideErrorMessage
        placeholder='NRC Number'
      />
    </div>
  )
}
