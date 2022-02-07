<template>
  <div v-if="error" class="columns is-centered">
    <div class="has-background-danger has-text-white pl-1">
      {{ error }}
    </div>
  </div>

  <form @submit="postArticle">
    <div class="field columns">
      <div class="control column is-4 is-offset-4">
        <label class="label">TITLE:</label>
        <base-form-input type="text" name="title" @change="titleHandle" />
        <div class="has-background-danger has-text-white pl-1">
          <small>{{ errors.title }}</small>
        </div>
      </div>
    </div>

    <div class="field columns">
      <div class="control column is-4 is-offset-4">
        <label class="label">CONTENT:</label>
        <base-form-textarea
          type="textarea"
          name="content"
          @change="contentHandle"
        />
        <div class="has-background-danger has-text-white pl-1">
          <small>{{ errors.content }}</small>
        </div>
      </div>
    </div>

    <base-button :disabled="isSubmitting" :btn-text="'投稿する'" />
  </form>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useField, useForm } from 'vee-validate'
import { postEntrySchema } from '@/include/validation'
import BaseButton from '@/components/baseItem/BaseButton'
import BaseFormInput from '@/components/baseItem/BaseFormInput'
import BaseFormTextarea from '@/components/baseItem/BaseFormTextarea'

export default {
  name: 'AppPostForm',
  components: {
    BaseButton,
    BaseFormInput,
    BaseFormTextarea,
  },
  setup() {
    const { errors, handleSubmit, isSubmitting } = useForm({
      validationSchema: postEntrySchema,
      initialValues: {
        title: '',
        content: '',
      },
    })

    const { handleChange: titleHandle } = useField('title')
    const { handleChange: contentHandle } = useField('content')

    const store = useStore()

    return {
      errors,
      isSubmitting,
      titleHandle,
      contentHandle,
      postArticle: handleSubmit((postData) => {
        postData['user_id'] = store.state.auth['user'].userid
        store.dispatch('postArticle', postData)
      }),
      error: computed(() => store.state.auth['error']),
    }
  },
}
</script>
