"use client";
import { CardMedia } from "@mui/material";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

const Slider = ({ slides = [] }) => {
  return (
    <Swiper
      slidesPerView={1}
      navigation={true}
      modules={[Navigation]}
      autoplay
      loop
      watchSlidesProgress
      allowSlideNext
      allowSlidePrev
      allowTouchMove
      hashNavigation
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <CardMedia
            component="img"
            height={"100%"}
            image={slide}
            alt={slide}
            sx={{
              objectFit: "scale-down",
              aspectRatio: "auto",
              maxHeight: 300,
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
