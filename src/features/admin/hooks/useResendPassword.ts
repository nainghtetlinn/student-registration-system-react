import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { resendPassword } from '@/api/admin/resend-password'
import type { ResendPasswordResponse } from '@/types/api'

export const useResendPassword = (
  options?: Omit<
    UseMutationOptions<ResendPasswordResponse, Error, { email: string }>,
    'mutationFn'
  >,
) =>
  useMutation({
    mutationFn: async (data) => {
      const response = await resendPassword(data)
      return response.data.message
    },
    ...options,
  })
