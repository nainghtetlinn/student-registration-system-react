import type { ApiResponse } from '@/types/api'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TRegistrationFormSchema } from '../schema/registration-form.schema'
import type {
  TCreateRegistrationFormResponse,
  TCreateRegistrationFormErrorResponse,
  TCreateRegistrationFormRequest,
} from '../types/create.type'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/api/lib/axios'
import { nrcObjectToString } from '@/lib/utils'

const toDto = (
  data: TRegistrationFormSchema,
): TCreateRegistrationFormRequest => ({
  formId: data.formId,
  fatherDeathDate: data.father.yod
    ? new Date(data.father.yod).toISOString().split('T')[0]
    : null,
  motherDeathDate: data.mother.yod
    ? new Date(data.mother.yod).toISOString().split('T')[0]
    : null,
  siblings: data.siblings.map((s) => ({ ...s, nrc: nrcObjectToString(s.nrc) })),
})

const createRegistrationForm = (data: TCreateRegistrationFormRequest) => {
  return api.patch<ApiResponse<TCreateRegistrationFormResponse>>(
    '/student/registrationForm',
    data,
  )
}

export const useCreateRegistrationForm = (
  options?: Omit<
    UseMutationOptions<
      TCreateRegistrationFormResponse,
      AxiosError<ApiResponse<TCreateRegistrationFormErrorResponse>>,
      TRegistrationFormSchema
    >,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['form', 'registration', 'create'],
    mutationFn: async (data) => {
      if (!data.acknowledged) throw new Error('Acknowledgement required.')
      const transformedData = toDto(data)
      const response = await createRegistrationForm(transformedData)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Registration form submitted successfully')
      onSuccess?.(response, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      toast.error(error.response?.data.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
