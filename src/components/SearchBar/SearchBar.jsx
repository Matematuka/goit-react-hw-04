import { Formik, Field, Form } from "formik";
const FORM_INITIAL_VALUES = {
  searchTerm: "",
};
const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (values) => {
    onSubmit(values.searchTerm);
  };
  return (
    <header>
      <Formik initialValues={FORM_INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form>
          <label>
            <Field
              type="text"
              name="searchTerm"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </label>
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
