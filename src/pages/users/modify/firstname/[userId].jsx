import { firstNameValidator } from "@/utils/validators"
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
  firstName: firstNameValidator.required().label("First Name"),
})
// eslint-disable-next-line max-lines-per-function
const ModifyPage = () => {
  const router = useRouter()
  const { userId } = router.query
  const { mutateAsync: saveUser } = useMutation({
    mutationFn: (user) => updateResource(`users/${userId}`, user),
  })
  const initialValues = {
    firstName: "",
  }
  const handleSubmit = useCallback(
    async ({ firstName }) => {
      const { data: user } = await saveUser({
        firstName,
      })
      router.push(`/`)
    },
    [saveUser, router]
  )

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField
          name="firstName"
          label="First Name"
          placeholder="Enter a first name"
        />
        <Button type="submit">Modify</Button>
      </Form>
    </Formik>
  )
}

export default ModifyPage
