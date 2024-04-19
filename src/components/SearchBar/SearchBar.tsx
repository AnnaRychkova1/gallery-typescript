import { notify } from '../services/toaster';
import { Field, Form, Formik } from 'formik';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

interface FormValues {
  query: string;
}
const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const trimmedQuery = values.query.trim();

    if (!trimmedQuery) {
      notify();
      return;
    }
    onSubmit(trimmedQuery);
    resetForm();
  };

  return (
    <header id="header">
      <Formik initialValues={{ query: '' }} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field
            className={css.formField}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
          />
          <button className={css.searchBtn} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
