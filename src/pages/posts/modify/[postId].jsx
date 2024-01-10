import { articleValidator } from "@/utils/validators"
import Button from "@/web/components/ui/Button"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import { updateResource } from "@/web/services/apiClient"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { object } from "yup"

const validationSchema = object({
  article: articleValidator.required().label("Article"),
})
const initialValues = {
  article: "",
}
const ModifyPage = () => {
  const router = useRouter()
  const { postId } = router.query
  const { mutateAsync: savePost } = useMutation({
    mutationFn: (post) => updateResource(`posts/${postId}`, post),
  })
  const handleSubmit = useCallback(
    async ({ article }) => {
      const { data: post } = await savePost({
        article,
      })
      router.push(`/posts/${post.result[0].id}`)
    },
    [savePost, router]
  )

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField
          name="article"
          label="Article"
          placeholder="Enter an article"
        />
        <Button type="submit">Modify</Button>
      </Form>
    </Formik>
  )
}

export default ModifyPage
