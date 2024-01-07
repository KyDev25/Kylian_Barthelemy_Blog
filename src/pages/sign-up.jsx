import {
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  passwordValidator,
} from "@/utils/validators"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import SubmitButton from "@/web/components/ui/SubmitButton"
import { createResource } from "@/web/services/apiClient"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import { object } from "yup"

const initialValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
}
const validationSchema = object({
  email: emailValidator.required().label("E-mail"),
  password: passwordValidator.required().label("Password"),
  firstName: firstNameValidator.required().label("First Name"),
  lastName: lastNameValidator.required().label("Last Name"),
})
const SignUpPage = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (data) => createResource("users", data),
  })
  const handleSubmit = async ({ email, password, firstName, lastName }) => {
    await mutateAsync({ email, password, firstName, lastName })
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField
          name="firstName"
          type="text"
          placeholder="Enter your first name"
          label="FirstName"
        />
        <FormField
          name="lastName"
          type="text"
          placeholder="Enter your last name"
          label="LastName"
        />
        <FormField
          name="email"
          type="email"
          placeholder="Enter your e-mail"
          label="E-mail"
        />
        <FormField
          name="password"
          type="password"
          placeholder="Enter your password"
          label="Password"
        />
        <SubmitButton>Sign Up</SubmitButton>
      </Form>
    </Formik>
  )
}

export default SignUpPage
