import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { FormCheckboxField } from '@/components/ui/form-fields'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'

import type { TSubjectChoiceFormSchema } from '../../schema/subject-choice-form.schema'

import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { useGetMajorData } from '@/api/lookup/get-major-data'

export const MajorChoices = () => {
  const {
    data: majors,
    isPending,
    isError,
  } = useGetMajorData({
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  const form = useFormContext<TSubjectChoiceFormSchema>()

  const currentValues = form.watch('majorChoices')

  useEffect(() => {
    if (!majors || majors.length === 0) return
    majors.forEach((_, i) => {
      form.setValue(`majorChoices.${i}.priorityScore`, i + 1)
    })
  }, [majors])

  if (isError) return <div>Something went wrong.</div>

  return (
    <div className='min-h-[550px] space-y-4'>
      <h2 className='mb-4 text-center leading-8 font-semibold'>
        နည်းပညာတက္ကသိုလ်(တောင်ကြီး)တွင်လျှောက်ထားနိုင်သည့်အထူးပြုဘာသာရပ်သင်တန်းများ
      </h2>
      {isPending ? (
        <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
          {[...Array(12)].map((_, i) => (
            <Skeleton
              key={i}
              className='h-8 w-full'
            />
          ))}
        </div>
      ) : (
        <div className='space-y-2'>
          {majors.map((m, i) => (
            <div
              key={m.id}
              className='grid grid-cols-1 md:grid-cols-2'
            >
              <div>
                {i + 1}. {m.engName} ({m.shortName})
              </div>
              <div>{m.mmName}</div>
            </div>
          ))}
        </div>
      )}

      <h2 className='mt-8 mb-4 text-center leading-8 font-semibold'>
        ဦးစားပေးသင်ကြားလိုသော အထူးပြုဘာသာရပ်(သင်တန်းများ)
      </h2>
      {isPending ? (
        <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
          {[...Array(6)].map((_, i) => (
            <Skeleton
              key={i}
              className='h-8 w-full'
            />
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2'>
          {[...Array(majors.length)].map((_, i) => {
            return (
              <React.Fragment key={i}>
                <FormField
                  control={form.control}
                  name={`majorChoices.${i}.majorName`}
                  render={({ field }) => (
                    <FormItem className='flex items-center gap-2'>
                      <FormLabel>{i + 1}.</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(newValue) => {
                          const existingIndex = currentValues.findIndex(
                            (item, idx) =>
                              item.majorName === newValue && idx !== i,
                          )

                          const prevValue = currentValues[i]?.majorName

                          if (existingIndex !== -1) {
                            if (prevValue) {
                              // Swap if current already has a value
                              form.setValue(
                                `majorChoices.${existingIndex}.majorName`,
                                prevValue,
                              )
                            } else {
                              // Clear previous field if current was empty
                              form.setValue(
                                `majorChoices.${existingIndex}.majorName`,
                                '',
                              )
                            }
                          }

                          // Set new value for current field
                          form.setValue(`majorChoices.${i}.majorName`, newValue)
                        }}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder={'Major'} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {majors.map((m) => {
                            const selectedIndex = currentValues.findIndex(
                              (item) => item.majorName === m.shortName,
                            )
                            return (
                              <SelectItem
                                key={m.id}
                                value={m.shortName}
                              >
                                {m.engName}
                                {selectedIndex !== -1 &&
                                  i !== selectedIndex && (
                                    <span className='text-muted-foreground ml-1'>
                                      ({selectedIndex + 1})
                                    </span>
                                  )}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </React.Fragment>
            )
          })}
        </div>
      )}

      <p className='font-semibold'>မှတ်ချက်။</p>
      <p>
        ဖြည့်စွက်သောအချက်များ မှားယွင်းမှုမရှိစေရန် ဂရုစိုက်ပါ။
        သင်ယူလိုသည့်အထူးပြုဘာသာရပ်များကို ဦးစားပေးအစီအစဉ်အလိုက် ဖော်ပြရာတွင်
        အပြည့်အစုံ မဖော်ပြသဖြင့် မိမိ လုံးဝမကြိုက်သော ဘာသာရပ်သို့
        ရောက်သွားခဲ့ပါက လျှောက်ထားသူ၏တာဝန်သာဖြစ်ပါသည်။ မိမိရရှိသော
        အထူးပြုဘာသာရပ် တစ်ခုမှ နောက်တစ်ခုသို့ ပြောင်းလဲလျှောက်ထားလိုပါက
        မိမိဝင်ခွင့်ရမှတ်နှင့် တူညီသော (သို့မဟုတ်) ဝင်ခွင့်ရမှတ်ထက်နိမ့်သော
        အထူးပြုဘာသာရပ်သို့ ပြောင်းရွှေ့ခွင့်ကို အထူးပြုဘာသာရပ်ထုတ်ပြန်သည့်
        နေ့မှစတင်၍ (၁) ပတ်အတွင်း၌သာကျောင်းသားရေးရာဌာနတွင်
        လက်ခံဆောင်ရွက်ပေးပါမည်။
      </p>

      <FormCheckboxField
        control={form.control}
        name='acknowledged'
        label='အထက်ပါ ဘာသာရပ်ရွေးချယ်ခွင့်လျှောက်လွှာကို ကျွန်တော်ကျွန်မတို့၏ သဘောတူညီချက်ဖြင့်တင်သွင်းခြင်းဖြစ်ပါသည်။'
      />
    </div>
  )
}
