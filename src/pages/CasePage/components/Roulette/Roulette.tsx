import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Button } from "@mui/material";
import { ICard } from "../../../../core/types";
import { getRarityColor } from "../../../../core/utils/getRarityColor";
import { generateAwardsArray } from "../../../../core/utils/generateAwardsArray";
import { randomIntFromInterval } from "../../../../core/utils/randomIntFromInterval";
import { getRandomCard } from "../../../../core/utils/getRandomCard";
import baraban from "../../../../assets/baraban.mp3";

export const Roulette = ({ caseCards }: { caseCards: ICard[] }) => {
  const [swiperParams, setSwiperParams] = useState<SwiperType | null>(null);
  const [slides, setSlides] = useState(() => generateAwardsArray(caseCards));
  const [award, setAward] = useState<ICard | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isAnimationEnd, setIsAnimationEnd] = useState(true);
  const audio: HTMLAudioElement = new Audio(baraban);

  const startIndex = 100;

  const startSpin = async () => {
    if (isSpinning) return;
    audio.play();
    setIsSpinning(true);
    setIsAnimationEnd(false);

    const prize = getRandomCard(caseCards);
    setAward(prize);

    const newSlides = generateAwardsArray(caseCards);
    setSlides(newSlides);
  };

  useEffect(() => {
    if (award && swiperParams && !swiperParams?.destroyed && !isAnimationEnd) {
      const prepareSlideToIndex = slides.findIndex(
        ({ id }, index) => index > startIndex && id === award?.id
      );

      if (prepareSlideToIndex !== -1) {
        swiperParams.update();

        swiperParams.slideTo(randomIntFromInterval(3, 70), 0);
        setTimeout(() => {
          swiperParams.slideTo(prepareSlideToIndex, 4000);
        }, 100);
      }
    }
  }, [award, slides, swiperParams, isAnimationEnd]);

  useEffect(
    () => () => {
      audio.pause();
      audio.currentTime = 0;
    },
    []
  );

  const onEndAnimation = (swiper: SwiperType) => {
    const prepareSlideToIndex = slides.findIndex(
      ({ id }, index) => index > startIndex && id === award?.id
    );

    if (swiper.activeIndex === prepareSlideToIndex) {
      setIsAnimationEnd(true);
      setIsSpinning(false);
      console.log("You won:", award);
    }
  };

  return (
    <div>
      <div>
        <Swiper
          spaceBetween={8}
          slidesPerView={3}
          initialSlide={randomIntFromInterval(3, 70)}
          centeredSlides
          onSlideChangeTransitionEnd={onEndAnimation}
          allowTouchMove={false}
          onAfterInit={(swiper) => {
            setSwiperParams(swiper);
          }}
        >
          {slides.map((item, index) => (
            <SwiperSlide
              key={`${item.id}_${index}`}
              style={{
                border: `2px solid ${getRarityColor(item.rarity)}`,
                padding: "40px",
              }}
            >
              {item.name}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        <Button onClick={startSpin} disabled={isSpinning}>
          Spin
        </Button>
      </div>
    </div>
  );
};
