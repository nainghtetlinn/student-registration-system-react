import { MAJORS } from '@/lib/constants'

import { useFormContext } from 'react-hook-form'

import { type TSubjectChoiceFormSchema } from '../../schemas/subject-choice-form-schema'
import { MajorSelectField } from '../ui/major-select-field'
import { FormCheckboxField } from '@/components/ui/form-fields'

export const MajorChoices = () => {
  const form = useFormContext<TSubjectChoiceFormSchema>()

  return (
    <div className='min-h-[550px] space-y-4'>
      <h2 className='mb-4 text-center leading-8 font-semibold'>
        နည်းပညာတက္ကသိုလ်(တောင်ကြီး)တွင်လျှောက်ထားနိုင်သည့်အထူးပြုဘာသာရပ်သင်တန်းများ
      </h2>
      <div className='space-y-2'>
        {MAJORS.map((m, i) => (
          <div
            key={m.id}
            className='grid grid-cols-1 md:grid-cols-2'
          >
            <div>
              {i + 1}. {m.name.en} ({m.short})
            </div>
            <div>{m.name.mm}</div>
          </div>
        ))}
      </div>

      <h2 className='mt-8 mb-4 text-center leading-8 font-semibold'>
        ဦးစားပေးသင်ကြားလိုသော အထူးပြုဘာသာရပ်(သင်တန်းများ)
      </h2>
      <div className='grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2'>
        <MajorSelectField
          control={form.control}
          name='majorChoices.first'
          label='1.'
        />
        <MajorSelectField
          control={form.control}
          name='majorChoices.second'
          label='2.'
        />
        <MajorSelectField
          control={form.control}
          name='majorChoices.third'
          label='3.'
        />
        <MajorSelectField
          control={form.control}
          name='majorChoices.fourth'
          label='4.'
        />
        <MajorSelectField
          control={form.control}
          name='majorChoices.fifth'
          label='5.'
        />
        <MajorSelectField
          control={form.control}
          name='majorChoices.sixth'
          label='6.'
        />
      </div>

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
