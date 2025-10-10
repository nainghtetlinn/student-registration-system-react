import {
  queryOptions,
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from '@tanstack/react-query'

import type { TEntranceFormSchema } from '@/features/student/schemas/entrance-form-schema'
import { nrcStringToObject } from '@/lib/utils'
import type { ApiResponse } from '@/types/api'
import type { TForm } from '@/types/form'
import type { TGetEntranceFormResponse } from '@/types/student'
import { api } from '../lib/axios'

const fromDto = (
  data: TGetEntranceFormResponse,
): { formDetails: TForm; formData: TEntranceFormSchema } => {
  return {
    formDetails: data.formData,
    formData: {
      formId: data.formData.id,
      student: {
        nameEn: data.studentNameEng,
        nameMm: data.studentNameMm,
        ethnicity: data.ethnicity,
        religion: data.religion,
        nrc: nrcStringToObject(data.studentNrc),
        dob: new Date(data.dob),
        matriculationPassedYear: data.matriculationPassedYear,
        matriculationDepartment: data.department,
        enrollmentNumber: data.enrollmentNumber,
      },
      father: {
        nameEn: data.fatherNameEng,
        nameMm: data.fatherNameMm,
        nrc: nrcStringToObject(data.fatherNrc),
        job: data.fatherJob,
      },
      mother: {
        nameEn: data.motherNameEng,
        nameMm: data.motherNameMm,
        nrc: nrcStringToObject(data.motherNrc),
        job: data.motherJob,
      },
      contact: {
        address: data.address,
        phoneNumber: data.phoneNumber,
        permanentAddress: data.permanentAddress,
        permanentPhoneNumber: data.permanentPhoneNumber,
      },
      acknowledged: false,
    },
  }
}

const getEntranceForm = () => {
  return api.get<ApiResponse<TGetEntranceFormResponse>>('/student/entranceForm')
}

export const getEntranceFormQuery = () =>
  queryOptions({
    queryKey: ['entrance form'],
    queryFn: async () => {
      const response = await getEntranceForm()
      return fromDto(response.data.data)
    },
  })

export const useGetEntranceForm = (
  options?: Omit<
    UseQueryOptions<
      { formDetails: TForm; formData: TEntranceFormSchema },
      Error,
      { formDetails: TForm; formData: TEntranceFormSchema },
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['entrance form'],
    queryFn: async () => {
      const response = await getEntranceForm()
      return fromDto(response.data.data)
    },
    ...options,
  })
}
