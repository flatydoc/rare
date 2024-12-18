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
  const [slides] = useState(() => generateAwardsArray(caseCards));
  const [award, setAward] = useState<ICard | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isAnimationEnd, setIsAnimationEnd] = useState(true);

  const [audio] = useState(new Audio(baraban));
  const startIndex = randomIntFromInterval(2, 499);

  const startSpin = async () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setIsAnimationEnd(false);

    audio.play();

    const prize = getRandomCard(caseCards);
    setAward(prize);
  };

  const prepareSlideToIndex = slides.findIndex(
    ({ id }, index) => index > startIndex && id === award?.id
  );

  useEffect(() => {
    if (award && swiperParams && !swiperParams?.destroyed && !isAnimationEnd) {
      if (prepareSlideToIndex !== -1) {
        setTimeout(() => {
          swiperParams.slideTo(prepareSlideToIndex, 4000);
        }, 100);
      }
    }
  }, [award, swiperParams, isAnimationEnd]);

  const onEndAnimation = (swiper: SwiperType) => {
    if (swiper.activeIndex === prepareSlideToIndex) {
      setIsAnimationEnd(true);
      setIsSpinning(false);

      audio.pause();
      audio.currentTime = 0;

      console.log("You won:", award);
    }
  };

  return (
    <div>
      <div>
        <Swiper
          spaceBetween={8}
          slidesPerView={3}
          initialSlide={startIndex}
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
