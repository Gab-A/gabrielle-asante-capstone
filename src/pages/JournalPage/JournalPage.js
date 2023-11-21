import { useState, useEffect } from "react";
import "./JournalPage.scss";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function JournalPage() {
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submit, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitted(true);

    const newJournal = {
      title: event.target.title.value,
      description: event.target.content.value,
    };
    try {
      await axios.post("/journal", newJournal);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }

    setErrors({});

    let formIsValid = true;

    const errors = {};

    if (!title) {
      formIsValid = false;
      errors["title"] = "Hey, you forgot to enter a title for your journal";
    }

    if (!content) {
      formIsValid = false;
      errors["content"] =
        "Hey, you forgot to add some content for your journal";
    }

    if (!formIsValid) {
      setErrors(errors);
    }

    if (!formIsValid) {
      setMessage(false);
    } else {
      setMessage("Journal entry uploaded. Redirecting to you the ");
      setTimeout(() => {
        // navigate("/");
      }, 1500);
      event.target.reset();
    }
  };

  return (
    <section className="journal">
      <div className="journal__wrapper">
        <p>This is the journal page.</p>
        <form className="journal__form" onSubmit={handleSubmit}>
          <div className="journal__form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={handleChangeTitle}
              className={`journal__input ${
                submit && title === "" ? "journal__input--invalid" : ""
              }`}
            />
            {errors.title && (
              <p className="journal__form-error">{errors.title}</p>
            )}
          </div>
          <div className="journal__form-group">
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              id="content"
              value={content}
              onChange={handleChangeContent}
              className={`journal__input  journal__input--content${
                submit && content === "" ? "journal__input--invalid" : ""
              }`}
            />
            {errors.content && (
              <p className="journal__form-error">{errors.content}</p>
            )}
          </div>
          <div className="journal__button-group">
            <button className="journal__button">Save</button>
          </div>
        </form>
      </div>
      {isError && (
        <p className="journal__fail">Failed to upload your journal entry.</p>
      )}
      <p className="journal__redirect-message">{message}</p>
    </section>
  );
}
