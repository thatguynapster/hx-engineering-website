"use client";

import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import { object } from "yup";
import React from "react";

import { purchaseProductService } from "@/services";
import { Button, Field } from "@/components";
import { CartCheckoutSection } from ".";
import { useStore } from "@/hooks";
import { ISales } from "@/types";
import { schema } from "@/libs";

export const DeliveryDetails = ({
  setSection,
}: {
  setSection: (section: CartCheckoutSection["section"]) => void;
}) => {
  const { store, setStore } = useStore();

  const subtotal = store.cart
    ?.reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);
  const total = subtotal;

  return (
    <Formik
      validateOnMount
      enableReinitialize
      validationSchema={object({
        name: schema.requireString("Name"),
        email: schema.requireEmail("Email"),
        phone_number: schema.requirePhoneNumber("Phone Number"),
        location: object().shape({
          location: schema.requireString("Location"),
        }),
      })}
      initialValues={{
        name: "",
        email: "",
        phone_number: "",
        location: { location: "", lat: 0, lng: 0 },
      }}
      onSubmit={(values, { setSubmitting }) => {
        const cartData = store.cart;
        let sale: Partial<ISales> = {};
        let products = [];

        let _s = store;
        delete _s["missing_products"];
        delete _s["unavailable_products"];
        setStore(_s);

        cartData.forEach((item) => {
          products.push({
            _id: item._id,
            quantity: item.quantity,
          });
          sale.products = products;
        });

        sale.user = {
          name: values.name,
          email: values.email,
          phone: values.phone_number,
        };
        console.log(sale);

        purchaseProductService(sale)
          .then((resp) => {
            let _s = store;
            delete _s["cart"];
            delete _s["missing_products"];
            delete _s["unavailable_products"];
            setTimeout(() => {
              setStore({ ...store, ..._s });
            });

            toast.success("Order confirmed. You will be contacted soon.");
            setSection("complete");
          })
          .catch((error) => {
            console.log(error);
            if (error.unavailableProducts) {
              console.log("has unavailable products");
              setStore({
                ...store,
                unavailable_products: error.unavailableProducts,
              });
            }
            if (error.missingProducts) {
              console.log("has missing products");
              setStore({
                ...store,
                missing_products: error.missingProducts,
              });
            }
            toast.error(error.message ?? "Something unexpected happened");
            setSection("cart");
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({
        values,
        isValid,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
        handleSubmit,
      }) => (
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
                <p className="text-lg font-medium text-center">
                  Delivery Details
                </p>
              </div>

              <div className="flex flex-col p-4">
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
                    className="!mb-0"
                    name="phone_number"
                    label="Phone Number"
                    required
                  >
                    <Field.Phone
                      name="phone_number"
                      value={values.phone_number?.split("+")?.pop()}
                      {...{ setFieldValue, setFieldTouched }}
                      placeholder="020 000 0000"
                    />
                  </Field.Group>

                  <Field.Group name="location" label="Location" required>
                    <Field.Place
                      name="location"
                      value={values.location}
                      placeholder="Location"
                      {...{ setFieldValue, setFieldTouched }}
                    />
                  </Field.Group>
                </Form>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sticky bottom-0 bg-white dark:bg-neutral-gray">
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
          </div>
        </>
      )}
    </Formik>
  );
};
