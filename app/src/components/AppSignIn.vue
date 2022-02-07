<template>
  <div v-if="error" class="columns is-centered">
    <div class="has-background-danger has-text-white pl-1">
      {{ error }}
    </div>
  </div>

  <form @submit="postSignIn">
    <div class="field columns">
      <div class="control column is-4 is-offset-4">
        <label class="label">Email:</label>
        <base-form-input type="email" name="email" @change="emailHandel" />
        <div class="has-background-danger has-text-white pl-1">
          <small>{{ errors.email }}</small>
        </div>
      </div>
    </div>

    <div class="field columns">
      <div class="control column is-4 is-offset-4">
        <label class="label">Password:</label>
        <base-form-input
          type="password"
          name="password"
          @change="passwordHandle"
        />
        <div class="has-background-danger has-text-white pl-1">
          <small>{{ errors.password }}</small>
        </div>
      </div>
    </div>
    <div class="has-text-centered">
      <base-button :disabled="isSubmitting" :btn-text="'ログインする'" />
    </div>
  </form>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useField, useForm } from 'vee-validate'
import { signInSchema } from '@/include/validation'
import BaseButton from '@/components/baseItem/BaseButton'
import BaseFormInput from '@/components/baseItem/BaseFormInput'

export default {
  name: 'AppSignIn',
  components: {
    BaseButton,
    BaseFormInput,
  },
  setup() {
    const { errors, handleSubmit, isSubmitting } = useForm({
      validationSchema: signInSchema,
      initialValues: {
        email: '',
        password: '',
      },
    })

    const { handleChange: emailHandel } = useField('email')
    const { handleChange: passwordHandle } = useField('password')

    const store = useStore()

    return {
      errors,
      isSubmitting,
      emailHandel,
      passwordHandle,
      postSignIn: handleSubmit((postData) =>
        store.dispatch('postSignIn', postData)
      ),
      error: computed(() => store.state.auth['error']),
    }
  },
}
</script>
