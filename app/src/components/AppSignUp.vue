<template>
  <div v-if="error" class="columns is-centered">
    <div class="has-background-danger has-text-white pl-1">
      {{ error }}
    </div>
  </div>

  <form @submit="postSignUp">
    <div class="field columns">
      <div class="control column is-4 is-offset-4">
        <label class="label">Name:</label>
        <base-form-input type="text" name="name" @change="nameHandle" />
        <div class="has-background-danger has-text-white pl-1">
          <small>{{ errors.name }}</small>
        </div>
      </div>
    </div>

    <div class="field columns">
      <div class="control column is-4 is-offset-4">
        <label class="label">Email:</label>
        <base-form-input type="text" name="email" @change="emailHandle" />
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

    <div class="field columns">
      <div class="control column is-4 is-offset-4">
        <label class="label">PasswordConfirmation:</label>
        <base-form-input
          type="password"
          name="passwordConfirmation"
          @change="passwordConfirmationHandle"
        />
        <div class="has-background-danger has-text-white pl-1">
          <small>{{ errors.passwordConfirmation }}</small>
        </div>
      </div>
    </div>

    <div class="has-text-centered">
      <base-button :disabled="isSubmitting" :btn-text="'登録する'" />
    </div>
  </form>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useField, useForm } from 'vee-validate'
import { signUpSchema } from '@/include/validation'
import BaseButton from '@/components/baseItem/BaseButton'
import BaseFormInput from '@/components/baseItem/BaseFormInput'

export default {
  name: 'AppSignUp',
  components: {
    BaseButton,
    BaseFormInput,
  },
  setup() {
    const { errors, handleSubmit, isSubmitting } = useForm({
      validationSchema: signUpSchema,
      initialValues: {
        name: '',
        email: '',
        password: '',
      },
    })

    const { handleChange: nameHandle } = useField('name')
    const { handleChange: emailHandle } = useField('email')
    const { handleChange: passwordHandle } = useField('password')
    const { handleChange: passwordConfirmationHandle } = useField(
      'passwordConfirmation'
    )

    const store = useStore()

    return {
      nameHandle,
      emailHandle,
      passwordHandle,
      passwordConfirmationHandle,
      errors,
      isSubmitting,
      postSignUp: handleSubmit((postData) =>
        store.dispatch('postSignUp', postData)
      ),
      error: computed(() => store.state.auth['error']),
    }
  },
}
</script>
