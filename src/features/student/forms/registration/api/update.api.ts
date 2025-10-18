import type { ApiResponse } from '@/types/api'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TRegistrationFormSchema } from '../schema/registration-form.schema'
import type {
  TUpdateRegistrationFormErrorResponse,
  TUpdateRegistrationFormRequest,
  TUpdateRegistrationFormResponse,
} from '../types/update.type'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/api/lib/axios'
import { nrcObjectToString } from '@/lib/utils'

const toDto = (
  data: TRegistrationFormSchema,
): TUpdateRegistrationFormRequest => ({
  fatherDeathDate: data.father.yod
    ? new Date(data.father.yod.toString()).toISOString()
    : null,
  motherDeathDate: data.mother.yod
    ? new Date(data.mother.yod.toString()).toISOString()
    : null,
  siblings: data.siblings.map((s) => ({ ...s, nrc: nrcObjectToString(s.nrc) })),
})

const updateRegistrationForm = (data: TUpdateRegistrationFormRequest) => {
  return api.patch<ApiResponse<TUpdateRegistrationFormResponse>>(
    '/student/registrationForm',
    data,
  )
}

export const useUpdateRegistrationForm = (
  options?: Omit<
    UseMutationOptions<
      TUpdateRegistrationFormResponse,
      AxiosError<ApiResponse<TUpdateRegistrationFormErrorResponse>>,
      TRegistrationFormSchema
    >,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['form', 'registration', 'update'],
    mutationFn: async (data) => {
      if (!data.acknowledged) throw new Error('Acknowledgement required.')
      const transformedData = toDto(data)
      const response = await updateRegistrationForm(transformedData)
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
