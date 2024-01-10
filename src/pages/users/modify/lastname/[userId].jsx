import { lastNameValidator } from "@/utils/validators"
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
  lastName: lastNameValidator.required().label("Last Name"),
})
// eslint-disable-next-line max-lines-per-function
const ModifyPage = () => {
  const router = useRouter()
  const { userId } = router.query
  const { mutateAsync: saveUser } = useMutation({
    mutationFn: (user) => updateResource(`users/${userId}`, user),
  })
  const initialValues = {
    lastName: "",
  }
  const handleSubmit = useCallback(
    async ({ lastName }) => {
      const { data: user } = await saveUser({
        lastName,
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
          name="lastName"
          label="Last Name"
          placeholder="Enter a last name"
        />
        <Button type="submit">Modify</Button>
      </Form>
    </Formik>
  )
}

export default ModifyPage
