import { useDispatch, useSelector } from 'react-redux'
import { hideSnackbar, showSnackbar } from '@/store/snackbarSlice'

export const useSnackbar = () => {
  const dispatch = useDispatch()
  const snackbar = useSelector(state => state.snackbar)

  const triggerSnackbar = (message, type = 'info') => {
    dispatch(showSnackbar({ message, type }))
  }

  const closeSnackbar = () => {
    dispatch(hideSnackbar())
  }

  return {
    visible: snackbar.visible,
    message: snackbar.message,
    type: snackbar.type,
    closeSnackbar,
    triggerSnackbar,
  }
}
