import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";

export default function BookingForm() {
  const initialValues = {
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    bookingDate: Yup.date().required("Booking date is required"),
    comment: Yup.string(),
  });

  const onSubmit = (values: typeof initialValues) => {
    console.log(values);
    alert("Booking submitted!");
  };

  return (
    <div className="border border-(--gray-light) rounded-[10px] p-11 w-[641px] h-[588px]">
      <h3 className="font-semibold text-[20px] leading-[1.2] mb-2">
        Book your campervan now
      </h3>
      <p className="font-normal text-[16px] leading-normal text-(--gray) mb-8">
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="flex flex-col gap-3.5 ">
          <Field
            name="name"
            placeholder="Name*"
            className="rounded-xl px-[18px] py-[18px] pr-[337px] w-full h-[60px] bg-(--inputs)"
          />
          <ErrorMessage
            name="name"
            component="div"
            className="text-red-500 text-sm"
          />

          <Field
            name="email"
            type="email"
            placeholder="Email*"
            className="rounded-xl px-[18px] py-[18px] pr-[337px] w-full h-[60px] bg-(--inputs)"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-sm"
          />

          <Field
            name="bookingDate"
            type="date"
            placeholder="Booking date*"
            className="rounded-xl px-[18px] py-[18px] pr-[337px] w-full h-[60px] bg-(--inputs)"
          />
          <ErrorMessage
            name="bookingDate"
            component="div"
            className="text-red-500 text-sm"
          />

          <Field
            name="comment"
            as="textarea"
            placeholder="Comment"
            className="rounded-[10px] px-[18px] py-[18px] pr-[308px] pb-[76px] w-full h-[118px] bg-(--inputs) resize-none"
          />

          <button
            type="submit"
            className="rounded-[200px] px-[60px] py-4 mt-2 w-[166px] h-14 bg-(--button) font-medium text-[16px] leading-normal tracking-[-0.01em] text-(--white) m-auto"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
