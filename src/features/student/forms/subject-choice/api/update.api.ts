import type { ApiResponse } from '@/types/api'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TSubjectChoiceFormSchema } from '../schema/subject-choice-form.schema'
import type {
  TUpdateSubjectChoiceFormErrorResponse,
  TUpdateSubjectChoiceFormRequest,
  TUpdateSubjectChoiceFormResponse,
} from '../types/update.type'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/api/lib/axios'

const toDto = (
  data: TSubjectChoiceFormSchema,
): TUpdateSubjectChoiceFormRequest => ({
  studentNickname: data.student.otherName,
  fatherNickname: data.father.otherName,
  motherNickname: data.mother.otherName,
  fatherEthnicity: data.father.ethnicity,
  motherEthnicity: data.mother.ethnicity,
  fatherReligion: data.father.religion,
  motherReligion: data.mother.religion,
  fatherDob: data.father.dob.toISOString().split('T')[0],
  motherDob: data.mother.dob.toISOString().split('T')[0],
  studentPob: data.student.pob,
  fatherPob: data.father.pob,
  motherPob: data.mother.pob,
  fatherPhoneNumber: data.father.phoneNumber,
  motherPhoneNumber: data.mother.phoneNumber,
  fatherAddress: data.father.address,
  motherAddress: data.mother.address,
  matriculationRollNumber: data.matriculation.rollNo,
  subjectScores: [
    { subjectName: 'MYAN', score: data.matriculation.myanmar },
    { subjectName: 'ENG', score: data.matriculation.english },
    { subjectName: 'MATH', score: data.matriculation.mathematic },
    { subjectName: 'CHEMIST', score: data.matriculation.chemistry },
    { subjectName: 'PHYSICS', score: data.matriculation.physics },
    { subjectName: 'OTHERS', score: data.matriculation.other },
  ],
  majorChoices: data.majorChoices,
})

const updateSubjectChoiceForm = (data: TUpdateSubjectChoiceFormRequest) => {
  return api.patch<ApiResponse<TUpdateSubjectChoiceFormResponse>>(
    '/student/subjectChoiceForm',
    data,
  )
}

export const useUpdateSubjectChoiceForm = (
  options?: Omit<
    UseMutationOptions<
      TUpdateSubjectChoiceFormResponse,
      AxiosError<ApiResponse<TUpdateSubjectChoiceFormErrorResponse>>,
      TSubjectChoiceFormSchema
    >,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['form', 'subject-choice', 'update'],
    mutationFn: async (data) => {
      if (!data.acknowledged) throw new Error('Acknowledgement required.')
      const transformedData = toDto(data)
      const response = await updateSubjectChoiceForm(transformedData)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Subject choice form submitted successfully')
      onSuccess?.(response, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      toast.error(error.response?.data.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
