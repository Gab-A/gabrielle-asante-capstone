import { Swiper, SwiperSlide } from "swiper/react";

import "./QuotesCarousel.scss";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import quoteImg from "../../assets/icons/quote.svg";

import { Autoplay, Navigation } from "swiper/modules";

export default function QuotesCarousel({ quotes }) {
  const quotesSlides = quotes.map((quote) => (
    <SwiperSlide key={quote.id}>
      {/* <blockquote className="carousel__blockquote"> */}
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

      {/* </blockquote> */}
      {/* <p className="carousel__author"> - {quote.author}</p> */}
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
      <h4 className="carousel__quote-title">Your Daily Motivational Quotes:</h4>
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
    </>
  );
}
