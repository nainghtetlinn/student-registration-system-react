import type { ApiResponse } from '@/types/api'
import type { TForm } from '@/types/form'
import type { QueryKey, UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TRegistrationFormSchema } from '../schema/registration-form.schema'
import type { TFiles, TGetRegistrationFormResponse } from '../types/get.type'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/api/lib/axios'
import { nrcStringToObject } from '@/lib/utils'

type TData = {
  formDetails: TForm
  formData: TRegistrationFormSchema
  files: TFiles
}

const fromDto = (data: TGetRegistrationFormResponse): TData => {
  return {
    formDetails: data.formData,
    formData: {
      student: {
        nameEn: data.studentNameEng,
        nameMm: data.studentNameMm,
        otherName: data.studentNickname,
        ethnicity: data.studentEthnicity,
        religion: data.studentReligion,
        nrc: nrcStringToObject(data.studentNrc),
        dob: new Date(data.studentDob),
        pob: data.studentPob,
        enrollmentNumber: data.enrollmentNumber,
      },
      father: {
        nameEn: data.fatherNameEng,
        nameMm: data.fatherNameMm,
        otherName: data.fatherNickname,
        ethnicity: data.fatherEthnicity,
        religion: data.fatherReligion,
        nrc: nrcStringToObject(data.fatherNrc),
        dob: new Date(data.fatherDob),
        pob: data.fatherPob,
        address: data.fatherAddress,
        job: data.fatherJob,
        yod: data.fatherDeathDate
          ? new Date(data.fatherDeathDate).getFullYear()
          : ('' as unknown as number),
      },
      mother: {
        nameEn: data.motherNameEng,
        nameMm: data.motherNameMm,
        otherName: data.motherNickname,
        ethnicity: data.motherEthnicity,
        religion: data.motherReligion,
        nrc: nrcStringToObject(data.motherNrc),
        dob: new Date(data.motherDob),
        pob: data.motherPob,
        address: data.motherAddress,
        job: data.motherJob,
        yod: data.motherDeathDate
          ? new Date(data.motherDeathDate).getFullYear()
          : ('' as unknown as number),
      },
      siblings: data.siblings.map((s) => ({
        ...s,
        nrc: nrcStringToObject(s.nrc),
      })),
      formId: data.formData.id,
      acknowledged: false,
    },
    files: {
      studentPhotoUrl: data.studentPhotoUrl,
      studentSignatureUrl: data.studentSignatureUrl,
      studentSignatureDate: data.studentSignatureDate,
      guardianName: data.guardianName,
      guardianSginatureUrl: data.guardianSginatureUrl,
      guardianSignatureDate: data.guardianSignatureDate,
    },
  }
}

const getRegistrationForm = () => {
  return api.get<ApiResponse<TGetRegistrationFormResponse>>(
    '/student/registrationForm',
  )
}

export const getRegistrationFormQuery = () =>
  queryOptions({
    queryKey: ['form', 'registration'],
    queryFn: async () => {
      const response = await getRegistrationForm()
      return fromDto(response.data.data)
    },
  })

export const useGetRegistrationForm = (
  options?: Omit<
    UseQueryOptions<TData, AxiosError<ApiResponse<string>>, TData, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['form', 'registration'],
    queryFn: async () => {
      const response = await getRegistrationForm()
      return fromDto(response.data.data)
    },
    ...options,
  })
}
