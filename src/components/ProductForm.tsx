import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import "./../styles/ProductForm.css";

interface ProductFormValues {
  title: string;
  description: string;
  image: string;
}

interface ProductFormProps {
  initialValues: ProductFormValues;
  onSubmit: (values: ProductFormValues) => void;
  buttonText: string;
  buttonCancelText?: string;
  onClick?: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Название обязательно"),
  description: Yup.string().required("Описание обязательно"),
  image: Yup.string()
    .url("Ссылка неправильная")
    .required("Ссылка на изображение обязательна"),
});

const ProductForm: React.FC<ProductFormProps> = ({
  initialValues,
  onSubmit,
  buttonText,
  buttonCancelText,
  onClick,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="create-product-page">
        <div>
          <label htmlFor="title">Название</label>
          <Field name="title" type="text" />
          <ErrorMessage
            name="title"
            component="div"
            className="error-message"
          />
        </div>
        <div>
          <label htmlFor="description">Описание</label>
          <Field name="description" as="textarea" />
          <ErrorMessage
            name="description"
            component="div"
            className="error-message"
          />
        </div>
        <div>
          <label htmlFor="image">Ссылка на изображение</label>
          <Field name="image" type="text" />
          <ErrorMessage
            name="image"
            component="div"
            className="error-message"
          />
        </div>
        <Button color="save" type="submit" text={buttonText} />
        {buttonCancelText && (
          <Button color="delete" onClick={onClick} text={buttonCancelText} />
        )}
      </Form>
    </Formik>
  );
};

export default ProductForm;
