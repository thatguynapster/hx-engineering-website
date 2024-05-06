"use client";

import React, { useState } from "react";
import { Form, Formik } from "formik";
import { object } from "yup";

import { CartCheckoutSection, CartItem } from ".";
import { Button, Field } from "@/components";
import { useStore } from "@/hooks";

export const DeliveryDetails = ({
  setOpen,
  setSection,
}: {
  setOpen: (open: boolean) => void;
  setSection: (section: CartCheckoutSection["section"]) => void;
}) => {
  const { store } = useStore();

  const subtotal = store.cart
    ?.reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);
  const total = subtotal;

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="py-3 bg-primary/10 dark:bg-neutral-gray dark:border dark:border-white">
            <p className="text-lg font-medium text-center">Cart total</p>
          </div>

          <div className="flex flex-col divide-y px-4">
            <div className="flex justify-between py-3">
              <p>Subtotal</p>
              <p>
                &#8373;
                {subtotal}
              </p>
            </div>
            <div className="flex justify-between py-3 text-lg font-medium">
              <p>Subtotal</p>
              <p>
                &#8373;
                {total}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="py-3 bg-primary/10 dark:bg-neutral-gray dark:border dark:border-white">
            <p className="text-lg font-medium text-center">Delivery Details</p>
          </div>

          <div className="flex flex-col p-4">
            <Formik
              validateOnMount
              enableReinitialize
              validationSchema={object({})}
              initialValues={{
                name: "",
                email: "",
                phone_number: "",
                location: "",
              }}
              onSubmit={({}, { setSubmitting }) => {}}
            >
              {({ values, isValid, isSubmitting, setFieldValue }) => (
                <Form className="flex flex-col gap-3">
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

                  <Field.Group
                    required
                    name="phone_number"
                    label="Phone Number"
                  >
                    <Field.Input
                      name="phone_number"
                      value={values.phone_number}
                      placeholder="Phone Number"
                    />
                  </Field.Group>

                  <Field.Group required name="location" label="Location">
                    <Field.Input
                      name="location"
                      value={values.location}
                      placeholder="Location"
                    />
                  </Field.Group>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 sticky bottom-0 bg-white dark:bg-neutral-gray">
        <Button
          className="btn-lg btn-primary w-full"
          onClick={() => {
            setSection("delivery");
          }}
        >
          Complete
        </Button>
      </div>
    </>
  );
};
