<template>
  <div v-if="error" class="columns is-centered">
    <div class="has-background-danger has-text-white pl-1">
      {{ error }}
    </div>
  </div>

  <form @submit="updateArticle">
    <div class="field columns">
      <div class="control column is-4 is-offset-4">
        <label class="label">TITLE:</label>
        <base-form-input
          type="text"
          name="title"
          @change="titleHandle"
          :value="title"
        />
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
          :value="content"
        />
        <div class="has-background-danger has-text-white pl-1">
          <small>{{ errors.content }}</small>
        </div>
      </div>
    </div>

    <base-button :disabled="isSubmitting" :btn-text="'投稿する'" />
  </form>
  <div class="has-text-right">
    <base-button
      class="is-danger"
      :btn-text="'削除する'"
      @click="removeArticle"
    />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
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
    const store = useStore()
    onMounted(() => {
      const articleId = store.state.auth['originalArticle'].articleId
      store.dispatch('editArticle', articleId)
    })

    const { meta, errors, handleSubmit, isSubmitting } = useForm({
      validationSchema: postEntrySchema,
      initialValues: {
        title: '',
        content: '',
      },
    })
    console.log(meta.value)

    const { handleChange: titleHandle } = useField('title')
    const { handleChange: contentHandle } = useField('content')

    return {
      title: computed(() => store.state.auth['originalArticle'].title),
      content: computed(() => store.state.auth['originalArticle'].content),
      errors,
      isSubmitting,
      titleHandle,
      contentHandle,
      updateArticle: handleSubmit((postData) =>
        store.dispatch('updateArticle', postData)
      ),
      removeArticle: () => store.dispatch('removeArticle'),
      error: computed(() => store.state.auth['error']),
    }
  },
}
</script>
