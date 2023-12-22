import { toast } from 'react-toastify'

function success(message: string) {
  toast.success(message, {
    position: 'top-right',
  })
}

function error(message: string) {
  toast.error(message, {
    position: 'top-right',
  })
}

export const Toast = {
  success,
  error,
}
