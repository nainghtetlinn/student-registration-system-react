export type TEntranceForm = {
  formId: number
  enrollmentNumber: string
  studentNameMm: string
  studentNameEng: string
  studentNrc: string
  ethnicity: string
  religion: string
  dob: string
  matriculationPassedYear: string
  department: string
  fatherNameMm: string
  fatherNameEng: string
  fatherNrc: string
  fatherJob: string
  motherNameMm: string
  motherNameEng: string
  motherNrc: string
  motherJob: string
  address: string
  phoneNumber: string
  permanentAddress: string
  permanentPhoneNumber: string
}

export type TSubjectChoiceForm = {
  formId: number
  studentNickname: string
  fatherNickname: string
  motherNickname: string
  fatherEthnicity: string
  motherEthnicity: string
  fatherReligion: string
  motherReligion: string
  fatherDob: string
  motherDob: string
  studentPob: string
  fatherPob: string
  motherPob: string
  fatherPhoneNumber: string
  motherPhoneNumber: string
  fatherAddress: string
  motherAddress: string
  matriculationRollNumber: string
  subjectScores: [
    {
      subjectName: 'MYAN'
      score: number
    },
    {
      subjectName: 'ENG'
      score: number
    },
    {
      subjectName: 'MATH'
      score: number
    },
    {
      subjectName: 'CHEMIST'
      score: number
    },
    {
      subjectName: 'PHYSICS'
      score: number
    },
    {
      subjectName: 'OTHERS'
      score: number
    },
  ]
  majorChoices: {
    majorName: string
    priorityScore: number
  }[]
}

export type TRegistrationForm = {
  formId: number
  fatherDeathDate: string | null
  motherDeathDate: string | null
  siblings: { name: string; nrc: string; job: string; address: string }[]
}
