import {
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  passwordValidator,
} from "@/utils/validators"
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
  email: emailValidator.required().label("Email"),
  password: passwordValidator.required().label("Password"),
  firstName: firstNameValidator.required().label("First Name"),
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
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  }
  const handleSubmit = useCallback(
    async ({ email, password, firstName, lastName }) => {
      const { data: user } = await saveUser({
        email,
        password,
        firstName,
        lastName,
      })
      router.push(`/users/${user.result[0].id}`)
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
          name="email"
          label="Email"
          type="email"
          placeholder="Enter an email"
        />
        <FormField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter a password"
        />
        <FormField
          name="firstName"
          label="First Name"
          placeholder="Enter a first name"
        />
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
