import {
  queryOptions,
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from '@tanstack/react-query'

import type { TSubjectChoiceFormSchema } from '@/features/student/schemas/subject-choice-form-schema'
import type { ApiResponse } from '@/types/api'
import type { TForm } from '@/types/form'
import type { TGetSubjectChoiceFormResponse } from '@/types/student'

import { nrcStringToObject } from '@/lib/utils'
import { api } from '../lib/axios'

const fromDto = (
  data: TGetSubjectChoiceFormResponse,
): {
  formDetails: TForm
  formData: TSubjectChoiceFormSchema
} => {
  return {
    formDetails: data.formData,
    formData: {
      formId: data.formData.id,
      student: {
        name: data.studentNameEng,
        otherName: data.studentNickname,
        ethnicity: data.studentEthnicity,
        religion: data.studentReligion,
        nrc: nrcStringToObject(data.studentNrc),
        dob: new Date(data.studentDob),
        pob: data.studentPob,
        phoneNumber: data.studentPhoneNumber,
        enrollmentNumber: data.enrollmentNumber,
      },
      father: {
        name: data.fatherNameEng,
        otherName: data.fatherNickname,
        ethnicity: data.fatherEthnicity,
        religion: data.fatherReligion,
        nrc: nrcStringToObject(data.fatherNrc),
        dob: new Date(data.fatherDob),
        pob: data.fatherPob,
        phoneNumber: data.fatherPhoneNumber,
        address: data.fatherAddress,
        job: data.fatherDob,
      },
      mother: {
        name: data.fatherNameEng,
        otherName: data.fatherNickname,
        ethnicity: data.fatherEthnicity,
        religion: data.fatherReligion,
        nrc: nrcStringToObject(data.fatherNrc),
        dob: new Date(data.fatherDob),
        pob: data.fatherPob,
        phoneNumber: data.fatherPhoneNumber,
        address: data.fatherAddress,
        job: data.fatherDob,
      },
      matriculation: {
        rollNo: data.matriculationRollNumber,
        year: data.matriculationPassedYear,
        department: data.department,
        myanmar: data.subjectScores[0].score || ('' as unknown as number),
        english: data.subjectScores[1].score || ('' as unknown as number),
        mathematic: data.subjectScores[2].score || ('' as unknown as number),
        chemistry: data.subjectScores[3].score || ('' as unknown as number),
        physics: data.subjectScores[4].score || ('' as unknown as number),
        other: data.subjectScores[5].score || ('' as unknown as number),
      },
      majorChoices: data.majorChoices,
      acknowledged: false,
    },
  }
}

const getSubjectChoiceForm = () => {
  return api.get<ApiResponse<TGetSubjectChoiceFormResponse>>(
    '/student/subjectChoiceForm',
  )
}

export const getSubjectChoiceFormQuery = () =>
  queryOptions({
    queryKey: ['subject choice form'],
    queryFn: async () => {
      const response = await getSubjectChoiceForm()
      return fromDto(response.data.data)
    },
  })

export const useGetSubjectChoiceForm = (
  options?: Omit<
    UseQueryOptions<
      { formDetails: TForm; formData: TSubjectChoiceFormSchema },
      Error,
      { formDetails: TForm; formData: TSubjectChoiceFormSchema },
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['subject choice form'],
    queryFn: async () => {
      const response = await getSubjectChoiceForm()
      return fromDto(response.data.data)
    },
    ...options,
  })
}
