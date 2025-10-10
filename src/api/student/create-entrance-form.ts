import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { type TEntranceFormSchema } from '@/features/student/schemas/entrance-form-schema'
import { nrcObjectToString } from '@/lib/utils'
import type { ApiResponse } from '@/types/api'
import type {
  TRegisterEntranceFormRequest,
  TRegisterEntranceFormResponse,
  TUpdateEntranceFormErrorResponse,
} from '@/types/student'
import { api } from '../lib/axios'

const toDto = (data: TEntranceFormSchema): TRegisterEntranceFormRequest => ({
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

export const createEntranceForm = (data: TRegisterEntranceFormRequest) => {
  return api.post<ApiResponse<TRegisterEntranceFormResponse>>(
    '/student/entranceForm',
    data,
  )
}

export const useCreateEntranceForm = (
  options?: Omit<
    UseMutationOptions<
      TRegisterEntranceFormResponse,
      AxiosError<ApiResponse<TUpdateEntranceFormErrorResponse>>,
      TEntranceFormSchema
    >,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['entrance form', 'create'],
    mutationFn: async (data) => {
      if (!data.acknowledged) throw new Error('Acknowledgement required.')
      const transformedData: TRegisterEntranceFormRequest = toDto(data)
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
