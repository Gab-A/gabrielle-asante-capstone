import { Swiper, SwiperSlide } from "swiper/react";
// import { useState, useEffect } from "react";
import "./QuotesCarousel.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

export default function QuotesCarousel({ quotes }) {
  const quotesSlides = quotes.map((quote) => (
    <SwiperSlide key={quote.id}>
      <p className="carousel__text">
        {quote.content} - {quote.author}
      </p>
    </SwiperSlide>
  ));
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        navigation={false}
        modules={[Autoplay, Navigation]}
        className="carousel"
      >
        {quotesSlides}
      </Swiper>
    </>
  );
}
