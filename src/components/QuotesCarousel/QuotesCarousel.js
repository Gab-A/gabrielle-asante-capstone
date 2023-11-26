import { Swiper, SwiperSlide } from "swiper/react";

import "./QuotesCarousel.scss";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules";

export default function QuotesCarousel({ quotes }) {
  const quotesSlides = quotes.map((quote) => (
    <SwiperSlide key={quote.id}>
      <blockquote className="carousel__blockquote">
        <p className="carousel__text">{quote.content}</p>
      </blockquote>
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
        className="carousel carousel__quotation-marks"
      >
        {quotesSlides}
      </Swiper>
    </>
  );
}
