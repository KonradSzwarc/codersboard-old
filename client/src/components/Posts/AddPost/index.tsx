import React from 'react';
import { Button } from 'antd';
import { Formik, Field, Form, FormikActions } from 'formik';
import * as Yup from 'yup';
import { Input, TextArea } from '../../formik';
import { addPost } from 'store/post/mutations/AddPost';

const initialValues: IFormValues = {
  title: '',
  content: '',
};

const addPostSchema = Yup.object().shape({
  title: Yup.string().required('Tytuł jest wymagany'),
  content: Yup.string().required('Treść jest wymagana'),
});

const AddPost = (props: Props) => {
  console.log(props.area);
  const handleSubmit = async (values: IFormValues, actions: FormikActions<IFormValues>) => {
    const formValues = {
      data: {
        ...values,
        user: {
          connect: {
            id: 'cjve18i8rzmew0b95ahmwqgvd',
          },
        },
        area: {
          connect: {
            areaURL: props.area,
          },
        },
      },
    };
    actions.resetForm();
    await addPost(formValues, props.area);
    props.hideModal();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={addPostSchema}>
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="title" label="Tytuł" size="large" component={Input} />
          <Field type="text" name="content" label="Treść" component={TextArea} />
          <Button htmlType="submit" size="large" type="primary" block loading={isSubmitting}>
            Dodaj
          </Button>
        </Form>
      )}
    </Formik>
  );
};

interface IFormValues {
  title: string;
  content: string;
}

interface Props {
  hideModal: Function;
  area: string;
}

export default AddPost;