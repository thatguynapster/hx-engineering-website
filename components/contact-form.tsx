import { Form, Formik } from "formik";
import React from "react";
import { Button, Field } from ".";
import { schema } from "@/libs";
import { object } from "yup";
import toast from "react-hot-toast";
import { contactService } from "@/services/contact";

const ContactForm = () => {
  return (
    <Formik
      validateOnMount
      enableReinitialize
      validationSchema={object({
        name: schema.requireString("Name"),
        email: schema.requireEmail("Email"),
        message: schema.requireString("Message"),
      })}
      initialValues={{
        name: "",
        email: "",
        message: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);

        contactService(values)
          .then((resp) => {
            console.log(resp);
            toast.success(`Hey ${values.name}, your message has been sent.`);

            setSubmitting(false);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Failed to send message");
          });
      }}
    >
      {({ values, isValid, isSubmitting, handleSubmit }) => (
        <Form className="flex flex-col lg:w-1/2 mx-auto gap-4">
          <h1 className="capitalize text-3xl font-semibold mb-4">
            How can we help?
          </h1>

          <div className="grid grid-cols-2 gap-4">
            <Field.Group
              required
              name="name"
              label="Name"
              className=" col-span-2"
            >
              <Field.Input name="name" value={values.name} placeholder="Name" />
            </Field.Group>

            <Field.Group
              required
              name="email"
              label="Email"
              className="col-span-2"
            >
              <Field.Input
                name="email"
                value={values.email}
                placeholder="Email"
              />
            </Field.Group>

            <Field.Group
              name="message"
              label="Message"
              required
              className="col-span-2"
            >
              <Field.Input
                as="textarea"
                rows={4}
                name="message"
                value={values.message}
                placeholder="Message"
                className="h-full"
              />
            </Field.Group>

            <Button
              className="btn-lg btn-primary w-full col-span-2"
              type="button"
              disabled={!isValid}
              onClick={() => {
                handleSubmit();
              }}
              {...{ isSubmitting }}
            >
              Complete
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
