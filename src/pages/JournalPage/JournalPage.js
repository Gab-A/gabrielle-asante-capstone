import { useEffect, useState } from "react";
import "./JournalPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import getJournalById from "../../scripts/utils/get-single-journal";
import thoughtIcon from "../../assets/icons/thought.png";
import arrowLeft from "../../assets/icons/arrow-left.svg";
import apiRequests from "../../scripts/utils/api-requests";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animations/loading.json";

export default function JournalPage({ mood, type, cardsArray, setMood }) {
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submit, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const { journalId } = useParams();

  useEffect(() => {
    const getAndSetJournal = async () => {
      try {
        const response = await getJournalById(journalId);

        if (journalId) {
          setTitle(response.title);
          setContent(response.content);
          setMood(response.mood);
        }
      } catch (error) {
        console.error(`Error fetching journal`);
      }
    };

    if (journalId) {
      getAndSetJournal();
    }
  }, [journalId]);

  useEffect(() => {
    const moodStored = localStorage.getItem("usersMood");
    if (moodStored) {
      setMood(moodStored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("usersMood", mood);
  }, [mood]);

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
        await apiRequests(
          "http://localhost:8000/journal",
          null,
          newJournal,
          "post"
        );
        setIsError(false);
      } catch (error) {
        setIsError(true);
      }
    } else {
      try {
        await apiRequests(
          `http://localhost:8000/journal/${journalId}`,
          null,
          newJournal,
          "patch"
        );
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
      errors["title"] = "Hey, please add a title!";
    }

    if (!content) {
      formIsValid = false;
      errors["content"] = "Hey, please add a note!";
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
      setLoading(true);
      setTimeout(() => {
        navigate("/journal-entries");
      }, 1500);
      event.target.reset();
    }
  };

  const getEmoji = () => {
    const moodEmoji = cardsArray?.find((card) => card.title === mood);
    return moodEmoji?.image;
  };

  const handleBackButtonClick = () => {
    if (type === "new") {
      navigate("/profile");
    } else {
      navigate("/journal-entries");
    }
  };

  return (
    <section className="journal">
      <div className="journal__wrapper">
        <div className="journal__header-container">
          <div className="journal__arrow-container">
            <img
              src={arrowLeft}
              onClick={handleBackButtonClick}
              alt="arrow left"
              className="journal__arrow-left"
            />
          </div>
          <div className="journal__header-content-container">
            <p className="journal__note">
              Take a moment to articulate your thoughts. This reflection will
              prove valuable later when you realize you've encapsulated this
              particular moment.
              <img
                src={thoughtIcon}
                alt="thought bubble"
                className="journal__thought-bubble"
              />
            </p>
            <div className="journal__mood-tell-wrapper">
              <div className="journal__emoji-container">
                <img
                  src={getEmoji()}
                  alt={`${mood} Emoji}`}
                  className="journal__emoji"
                />
              </div>
              <p className="journal__mood-explanation">
                What has made you feel{" "}
                <span className="journal__mood-span">{mood}</span>
              </p>
            </div>
          </div>
        </div>
        <form className="journal__form" onSubmit={handleSubmit}>
          <div className="journal__form-group journal__form-title">
            <label htmlFor="title" className="journal__form-label">
              Title
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
              Note
            </label>
            <textarea
              name="content"
              id="content"
              rows={15}
              value={content}
              placeholder="Add a note about how you are feeling today..."
              onChange={handleChangeContent}
              className={`journal__input  journal__input--content ${
                submit && content === "" ? "journal__input--invalid" : ""
              }`}
            />
            {errors.content && (
              <p className="journal__form-error journal__form-error--content">
                {errors.content}
              </p>
            )}
          </div>
          {isError && (
            <p className="journal__fail">
              Failed to upload your journal entry.
            </p>
          )}
          <div className="journal__redirect-container">
            <p className="journal__redirect-message">{message}</p>
            {loading && (
              <Lottie
                animationData={loadingAnimation}
                className="journal__loading"
              />
            )}
          </div>
          <div className="journal__button-container">
            <button className="journal__button">Save</button>
          </div>
        </form>
      </div>
    </section>
  );
}
