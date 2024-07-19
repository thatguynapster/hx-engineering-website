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
        <Form className="flex flex-col lg:w-1/2 mx-auto gap-3">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex flex-col w-full gap-3">
              <Field.Group required name="name" label="Name">
                <Field.Input
                  name="name"
                  value={values.name}
                  placeholder="Name"
                />
              </Field.Group>

              <Field.Group required name="email" label="Email">
                <Field.Input
                  name="email"
                  value={values.email}
                  placeholder="Email"
                />
              </Field.Group>
            </div>

            <div className="flex flex-col w-full gap-3">
              <Field.Group name="location" label="Location" required>
                <Field.Input
                  as="textarea"
                  rows={4}
                  name="message"
                  value={values.message}
                  placeholder="Message"
                />
              </Field.Group>
            </div>
          </div>

          <Button
            className="btn-lg btn-primary w-full"
            type="button"
            disabled={!isValid}
            onClick={() => {
              handleSubmit();
            }}
            {...{ isSubmitting }}
          >
            Complete
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
