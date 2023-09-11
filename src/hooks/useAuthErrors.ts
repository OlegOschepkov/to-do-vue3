import { createNamespacedHelpers } from 'vuex-composition-helpers';
import { computed, ComputedRef } from 'vue';

const { useGetters } = createNamespacedHelpers('authModule');

export function useAuthErrors(): ComputedRef<string> {
  const { getError } = useGetters(['getError']);

  return (computed((): string => {
    let message: string;

    if (getError.value.errorCode === 'auth/user-not-found') {
      message = 'пользователь не зарегистрирован'
    } else if (getError.value.errorCode === 'auth/wrong-password') {
      message = 'неверный пароль/логин'
    } else if (getError.value.errorCode === 'auth/email-already-exists') {
      message = 'почта уже используется'
    } else {
      message = 'попробуйте попозже или свяжитесь с тех.поддержкой'
    }

    return message
  }))
}
