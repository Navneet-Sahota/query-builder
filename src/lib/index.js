import { useState } from "react";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";

const QueryBuilder = ({ fieldOptions, criteriaOptions, onClose, onSubmit }) => {
  const [query, setQuery] = useState("");
  return (
    <div
      className="flex flex-col"
      style={{ width: "100vw", height: "100vh", backgroundColor: "#1D2025" }}
    >
      <Header queryString={query} onClose={onClose} />
      <Content
        setQuery={setQuery}
        fieldOptions={fieldOptions}
        criteriaOptions={criteriaOptions}
      />
      <Footer onClose={onClose} onSubmit={onSubmit} />
    </div>
  );
};

export default QueryBuilder;
