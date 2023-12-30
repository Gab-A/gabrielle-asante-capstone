import { Swiper, SwiperSlide } from "swiper/react";

import "./QuotesCarousel.scss";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import quoteImg from "../../assets/icons/quote.svg";

import getAllQuotes from "../../scripts/utils/get-all-quotes";

import { Autoplay, Navigation } from "swiper/modules";

import { useEffect, useState } from "react";

export default function QuotesCarousel() {
  const [quotes, setQuotes] = useState(null);
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await getAllQuotes();
        const quotesData = response;
        setQuotes(quotesData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuotes();
  }, []);

  if (!quotes) {
    return <p>Loading</p>;
  }
  const quotesSlides = quotes.map((quote) => (
    <SwiperSlide key={quote.id}>
      <div className="carousel__details">
        <div className="carousel__opening-quote-wrapper">
          <img
            src={quoteImg}
            className="carousel__quote"
            alt="opening quotation marks"
          ></img>
        </div>
        <p className="carousel__text">{quote.content}</p>
      </div>
      <div className="carousel__closing-quote-wrapper">
        <img
          src={quoteImg}
          className="carousel__quote--rotate"
          alt="closing quotation"
        ></img>
      </div>
      <p className="carousel__author"> - {quote.author}</p>
    </SwiperSlide>
  ));
  return (
    <>
      <div className="carousel__wrapper">
        <h4 className="carousel__heading">Your Daily Motivational Quotes:</h4>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          navigation={false}
          modules={[Autoplay, Navigation]}
          className="carousel__slide carousel__quotation-marks"
        >
          {quotesSlides}
        </Swiper>
      </div>
    </>
  );
}
