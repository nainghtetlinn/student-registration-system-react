import type { ApiResponse } from '@/types/api'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TEntranceFormSchema } from '../schema/entrance-form.schema'
import type {
  TCreateEntranceFormErrorResponse,
  TCreateEntranceFormRequest,
  TCreateEntranceFormResponse,
} from '../types/create.type'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/api/lib/axios'
import { nrcObjectToString } from '@/lib/utils'

const toDto = (data: TEntranceFormSchema): TCreateEntranceFormRequest => ({
  formId: data.formId,
  studentNameEng: data.student.nameEn,
  studentNameMm: data.student.nameMm,
  ethnicity: data.student.ethnicity,
  religion: data.student.religion,
  studentNrc: nrcObjectToString(data.student.nrc),
  dob: data.student.dob.toISOString().split('T')[0],
  matriculationPassedYear: data.student.matriculationPassedYear,
  department: data.student.matriculationDepartment,
  enrollmentNumber: data.student.enrollmentNumber,
  fatherNameEng: data.father.nameEn,
  fatherNameMm: data.father.nameMm,
  fatherNrc: nrcObjectToString(data.father.nrc),
  fatherJob: data.father.job,
  motherNameEng: data.mother.nameEn,
  motherNameMm: data.mother.nameMm,
  motherNrc: nrcObjectToString(data.mother.nrc),
  motherJob: data.mother.job,
  address: data.contact.address,
  phoneNumber: data.contact.phoneNumber,
  permanentAddress: data.contact.permanentAddress,
  permanentPhoneNumber: data.contact.permanentPhoneNumber,
})

const createEntranceForm = (data: TCreateEntranceFormRequest) => {
  return api.post<ApiResponse<TCreateEntranceFormResponse>>(
    '/student/entranceForm',
    data,
  )
}

export const useCreateEntranceForm = (
  options?: Omit<
    UseMutationOptions<
      TCreateEntranceFormResponse,
      AxiosError<ApiResponse<TCreateEntranceFormErrorResponse>>,
      TEntranceFormSchema
    >,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['form', 'entrance', 'create'],
    mutationFn: async (data) => {
      if (!data.acknowledged) throw new Error('Acknowledgement required.')
      const transformedData = toDto(data)
      const response = await createEntranceForm(transformedData)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Entrance form submitted successfully')
      onSuccess?.(response, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      toast.error(error.response?.data?.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
