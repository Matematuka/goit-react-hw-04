import { Formik, Field, Form } from "formik";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import css from "./SearchBar.module.css";

const notify = () =>
  toast("This field cannot be empty. Please enter a search query", {
    duration: 4000,
    position: "top-left",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });

const FORM_INITIAL_VALUES = {
  searchTerm: "",
};
const SearchBar = ({ onSubmit }) => {
  const validationSchema = Yup.object().shape({
    searchTerm: Yup.string().trim().required(notify),
  });

  const handleSubmit = (values) => {
    onSubmit(values.searchTerm);
  };
  return (
    <header>
      <Formik
        initialValues={FORM_INITIAL_VALUES}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <label>
            <Field
              className={css.formSearch}
              type="text"
              name="searchTerm"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </label>
          <button className={css.formBtn} type="submit">
            Search
          </button>
          <Toaster />
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
