import type { ApiResponse } from '@/types/api'
import type { TForm } from '@/types/form'
import type { QueryKey, UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TSubjectChoiceFormSchema } from '../schema/subject-choice-form.schema'
import type { TFiles, TGetSubjectChoiceFormResponse } from '../types/get.type'
import type { TEntranceFormSchema } from '@/features/student/forms/entrance/schema/entrance-form.schema'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/api/lib/axios'
import { nrcStringToObject } from '@/lib/utils'

const fromDto = (
  data: TGetSubjectChoiceFormResponse,
): {
  formDetails: TForm
  formData: TSubjectChoiceFormSchema
  files: TFiles
  entranceForm: TEntranceFormSchema
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
        job: data.fatherJob,
      },
      mother: {
        name: data.motherNameEng,
        otherName: data.motherNickname,
        ethnicity: data.motherEthnicity,
        religion: data.motherReligion,
        nrc: nrcStringToObject(data.motherNrc),
        dob: new Date(data.motherDob),
        pob: data.motherPob,
        phoneNumber: data.motherPhoneNumber,
        address: data.motherAddress,
        job: data.motherJob,
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
    files: {
      studentSignatureUrl: data.studentSignatureUrl,
      studentSignatureDate: data.studentSignatureDate,
      guardianName: data.guardianName,
      guardianSginatureUrl: data.guardianSginatureUrl,
      guardianSignatureDate: data.guardianSignatureDate,
    },
    entranceForm: {
      formId: data.formData.id,
      student: {
        nameEn: data.studentNameEng,
        nameMm: data.studentNameMm,
        ethnicity: data.studentEthnicity,
        religion: data.studentReligion,
        nrc: nrcStringToObject(data.studentNrc),
        dob: new Date(data.studentDob),
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
        address: '',
        phoneNumber: '',
        permanentAddress: '',
        permanentPhoneNumber: '',
      },
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
    queryKey: ['form', 'subject-choice'],
    queryFn: async () => {
      const response = await getSubjectChoiceForm()
      return fromDto(response.data.data)
    },
  })

export const useGetSubjectChoiceForm = (
  options?: Omit<
    UseQueryOptions<
      { formDetails: TForm; formData: TSubjectChoiceFormSchema },
      AxiosError<ApiResponse<string>>,
      { formDetails: TForm; formData: TSubjectChoiceFormSchema },
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['form', 'subject-choice'],
    queryFn: async () => {
      const response = await getSubjectChoiceForm()
      return fromDto(response.data.data)
    },
    ...options,
  })
}
