import { type TEntranceFormInput } from '../schemas/entrance-form-schema'

export const defaultEntranceFormInput: TEntranceFormInput = {
  academicYear: '',
  studentNameMm: '',
  studentNameEng: '',
  studentNrc: {
    stateCode: '',
    townshipCode: '',
    nrcType: '',
    nrcNumber: '',
  },
  ethnicity: '',
  religion: '',
  dob: '' as unknown as Date,

  matriculationPassedYear: '',
  rollNumber: '',
  department: '',

  fatherNameMm: '',
  fatherNameEng: '',
  fatherNrc: {
    stateCode: '',
    townshipCode: '',
    nrcType: '',
    nrcNumber: '',
  },
  fatherJob: '',

  motherNameMm: '',
  motherNameEng: '',
  motherNrc: {
    stateCode: '',
    townshipCode: '',
    nrcType: '',
    nrcNumber: '',
  },
  motherJob: '',

  address: '',
  phoneNumber: '',
  permanentAddress: '',
  permanentPhoneNumber: '',
}
