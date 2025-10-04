import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { type TEntranceFormInput } from '@/features/student/schemas/entrance-form-schema'
import { nrcObjectToString } from '@/lib/utils'
import type { ApiResponse } from '@/types/api'
import type {
  TRegisterEntranceFormRequest,
  TRegisterEntranceFormResponse,
} from '@/types/student'
import { api } from '../lib/axios'

export const createEntranceForm = (data: TEntranceFormInput) => {
  const transformedData: TRegisterEntranceFormRequest = {
    academicYear:
      data.academicYear ||
      `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
    rollNumber: data.rollNumber,
    studentNameMm: data.studentNameMm,
    studentNameEng: data.studentNameEng,
    studentNrc: nrcObjectToString(data.studentNrc),
    ethnicity: data.ethnicity,
    religion: data.religion,
    dob: data.dob.toISOString().split('T')[0],

    matriculationPassedYear: data.matriculationPassedYear,
    department: data.department,

    fatherNameMm: data.fatherNameMm,
    fatherNameEng: data.fatherNameEng,
    fatherNrc: nrcObjectToString(data.fatherNrc),
    fatherJob: data.fatherJob,

    motherNameMm: data.motherNameMm,
    motherNameEng: data.motherNameEng,
    motherNrc: nrcObjectToString(data.motherNrc),
    motherJob: data.motherJob,

    address: data.address,
    phoneNumber: data.phoneNumber,
    permanentAddress: data.permanentAddress,
    permanentPhoneNumber: data.permanentPhoneNumber,
  }
  return api.post<ApiResponse<TRegisterEntranceFormResponse>>(
    '/student/entranceForm',
    transformedData,
  )
}

export const useCreateEntranceForm = (
  options?: Omit<
    UseMutationOptions<
      TRegisterEntranceFormResponse,
      Error,
      TEntranceFormInput
    >,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['entrance form', 'create'],
    mutationFn: async (data) => {
      const response = await createEntranceForm(data)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Entrance form submitted successfully')
      onSuccess?.(response, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      if (error instanceof AxiosError)
        toast.error(error.response?.data?.message || error.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
