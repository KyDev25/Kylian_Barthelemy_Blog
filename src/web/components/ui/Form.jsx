import { Form as FormikForm } from "formik"

const Form = (props) => (
  <FormikForm
    className="p-5"
    noValidate
    {...props}
  />
)

export default Form
