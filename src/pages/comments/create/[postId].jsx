import { commentValidator, idValidator } from "@/utils/validators"
import Button from "@/web/components/ui/Button"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import { createResource } from "@/web/services/apiClient"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { object } from "yup"

const validationSchema = object({
  comment: commentValidator.required().label("Comment"),
})
const initialValues = {
  comment: "",
}
const CreatePage = () => {
  const router = useRouter()
  const { mutateAsync: saveComment } = useMutation({
    mutationFn: (comment, postId) =>
      createResource("comments", comment, postId),
  })
  const handleSubmit = useCallback(
    async ({ comment }) => {
      const { postId } = router.query
      const { data: comments } = await saveComment({
        comment,
        postId,
      })
      router.push(`/comments/${comments.result[0].id}`)
    },
    [saveComment, router]
  )

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField
          name="comment"
          label="Comment"
          placeholder="Enter a comment"
          className=""
        />
        <Button type="submit" className="mx-auto flex">
          Send
        </Button>
      </Form>
    </Formik>
  )
}

export default CreatePage
