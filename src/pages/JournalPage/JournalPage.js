import { useEffect, useState } from "react";
import "./JournalPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import getJournalById from "../../scripts/utils/get-single-journal";
import updateJournal from "../../scripts/utils/update-journal";
import thoughtIcon from "../../assets/icons/thought.png";

export default function JournalPage({ mood, type, cardsArray }) {
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submit, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const { journalId } = useParams();

  useEffect(() => {
    const getAndSetJournal = async () => {
      try {
        const response = await getJournalById(journalId);
        console.log(response);
        console.log(response.title);

        if (journalId) {
          setTitle(response.title);
          setContent(response.content);
        }
      } catch (error) {
        console.error(`Error fetching journal`);
      }
    };

    if (journalId) {
      getAndSetJournal();
    }
  }, [journalId]);

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
      content: event.target.content.value,
      mood,
    };

    if (type === "new") {
      try {
        await axios.post("http://localhost:8000/journal", newJournal);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      }
    } else {
      try {
        axios.patch(`http://localhost:8000/journal/${journalId}`, newJournal);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        console.error("Error updating journal entry:", error);
      }
    }

    setErrors({});

    let formIsValid = true;

    const errors = {};

    if (!title) {
      formIsValid = false;
      errors["title"] = "Hey, please add a title for your journal!";
    }

    if (!content) {
      formIsValid = false;
      errors["content"] = "Hey, please add some content for your journal!";
    }

    if (!formIsValid) {
      setErrors(errors);
    }

    if (!formIsValid) {
      setMessage(false);
    } else {
      setMessage(
        "Journal entry uploaded. Redirecting to your journal entries page "
      );
      setTimeout(() => {
        navigate("/journal-entries");
      }, 1500);
      event.target.reset();
    }
  };

  const getEmoji = () => {
    const moodEmoji = cardsArray.find((card) => card.title === mood);
    return moodEmoji.image;
  };

  return (
    <section className="journal">
      <div className="journal__wrapper">
        <div className="journal__intro-wrapper">
          <h2 className="journal__title">
            Write your vibe!
            <img
              src={thoughtIcon}
              alt="thought bubble"
              className="journal__thought-bubble"
            />
          </h2>
          {!journalId && mood && (
            <div className="journal__mood-tell-wrapper">
              <p className="journal__mood-tell">
                You are: <span className="journal__mood-span">{mood}</span>
              </p>
              <p className="journal__mood-explanation">
                Tell me more about why you are:{" "}
                <span className="journal__mood-span">{mood}</span>
              </p>

              <img src={getEmoji()} alt={`${mood} Emoji}`} />
            </div>
          )}
        </div>
        <form className="journal__form" onSubmit={handleSubmit}>
          <div className="journal__form-group journal__form-title">
            <label htmlFor="title" className="journal__form-label">
              Title:
            </label>
            <textarea
              type="text"
              name="title"
              id="title"
              placeholder="Title of your journal entry..."
              rows={2}
              value={title}
              onChange={handleChangeTitle}
              className={`journal__input journal__input--title${
                submit && title === "" ? "journal__input--invalid" : ""
              }`}
            />
            {errors.title && (
              <p className="journal__form-error">{errors.title}</p>
            )}
          </div>
          <div className="journal__form-group journal__form-content">
            <label htmlFor="content" className="journal__form-label">
              Note:
            </label>
            <textarea
              name="content"
              id="content"
              rows={15}
              value={content}
              placeholder="Add a note about how you are feeling today..."
              onChange={handleChangeContent}
              className={`journal__input  journal__input--content${
                submit && content === "" ? "journal__input--invalid" : ""
              }`}
            />
            {errors.content && (
              <p className="journal__form-error">{errors.content}</p>
            )}
          </div>
          <div className="journal__button-container">
            <button className="journal__button">Save</button>
          </div>
        </form>
      </div>
      {/* <div className="journal__status"> */}
      {isError && (
        <p className="journal__fail">Failed to upload your journal entry.</p>
      )}
      <p className="journal__redirect-message">{message}</p>
      {/* </div> */}
    </section>
  );
}
