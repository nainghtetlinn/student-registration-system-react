import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { type TSubjectChoiceFormSchema } from '@/features/student/schemas/subject-choice-form-schema'
import type { ApiResponse } from '@/types/api'
import type {
  TRegisterSubjectChoiceFormRequest,
  TRegisterSubjectChoiceFormResponse,
  TRegisterSubjectChoiceFormErrorResponse,
} from '@/types/student'
import { api } from '../lib/axios'

const toDto = (
  data: TSubjectChoiceFormSchema,
): TRegisterSubjectChoiceFormRequest => ({
  formId: data.formId,
  studentNickname: data.student.otherName,
  fatherNickname: data.father.otherName,
  motherNickname: data.mother.otherName,
  fatherEthnicity: data.father.ethnicity,
  motherEthnicity: data.mother.ethnicity,
  fatherReligion: data.father.religion,
  motherReligion: data.mother.religion,
  fatherDob: data.father.dob,
  motherDob: data.mother.dob,
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

export const createSubjectChoiceForm = (
  data: TRegisterSubjectChoiceFormRequest,
) => {
  return api.post<ApiResponse<TRegisterSubjectChoiceFormResponse>>(
    '/student/subjectChoiceForm',
    data,
  )
}

export const useCreateSubjectChoiceForm = (
  options?: Omit<
    UseMutationOptions<
      TRegisterSubjectChoiceFormResponse,
      AxiosError<ApiResponse<TRegisterSubjectChoiceFormErrorResponse>>,
      TSubjectChoiceFormSchema
    >,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['subject choice form', 'create'],
    mutationFn: async (data) => {
      if (!data.acknowledged) throw new Error('Acknowledgement required.')
      const transformedData: TRegisterSubjectChoiceFormRequest = toDto(data)
      const response = await createSubjectChoiceForm(transformedData)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Subject choice form submitted successfully')
      onSuccess?.(response, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      toast.error(error.response?.data?.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
