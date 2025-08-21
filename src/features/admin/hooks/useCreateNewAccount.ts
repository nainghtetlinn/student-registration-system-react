import { createNewAccountWithEmailAndRole } from '@/api/admin/create-new-account'
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import type { TCreateNewAccountInput } from '../utils/schemas'
import type { RegisterResponse } from '@/types/api'

export const useCreateNewAccount = (
  options?: Omit<
    UseMutationOptions<RegisterResponse, Error, TCreateNewAccountInput>,
    'mutationFn'
  >,
) =>
  useMutation({
    mutationFn: async (data) => {
      const response = await createNewAccountWithEmailAndRole(data)
      console.log(response.data)
      return response.data.data
    },
    ...options,
  })
