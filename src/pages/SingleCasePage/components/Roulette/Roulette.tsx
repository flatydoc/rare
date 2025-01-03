import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Box, Button, Typography } from "@mui/material";
import { ICardPrototype } from "../../../../core/types";
import { getRarityColor } from "../../../../core/utils/getRarityColor";
import { generateAwardsArray } from "../../../../core/utils/generateAwardsArray";
import { randomIntFromInterval } from "../../../../core/utils/randomIntFromInterval";
import { getRandomCard } from "../../../../core/utils/getRandomCard";
import baraban from "../../../../assets/baraban.mp3";
import { centerContentStyles } from "../../../../core/theme/common.style";
import { getBgByCardFraction } from "../../../../core/utils/getBgByFraction";
import { Ambient } from "../../../../components/ui/Ambient";
import { colors } from "../../../../core/theme/colors";

export const Roulette = ({ caseCards }: { caseCards: ICardPrototype[] }) => {
  const [swiperParams, setSwiperParams] = useState<SwiperType | null>(null);
  const [slides] = useState(() => generateAwardsArray(caseCards));
  const [award, setAward] = useState<ICardPrototype | null>(null);
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
    <Box>
      <Box>
        <Swiper
          spaceBetween={12}
          slidesPerView={3}
          initialSlide={startIndex}
          centeredSlides
          onSlideChangeTransitionEnd={onEndAnimation}
          allowTouchMove={false}
          onAfterInit={(swiper) => {
            setSwiperParams(swiper);
          }}
        >
          {slides.map((card, index) => (
            <SwiperSlide
              key={`${card.id}_${index}`}
              style={{
                padding: "0 12px",
              }}
            >
              <Box
                sx={{
                  ...centerContentStyles,
                  overflow: "hidden",
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: "300px",
                  borderRadius: "20px",
                  position: "relative",
                  padding: "10px",
                  aspectRatio: "1",
                  boxShadow: `0 1px 2px 0 inset ${getRarityColor(card.rarity)}`,
                  background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(${getBgByCardFraction(
                    card.fraction
                  )})`,
                  backgroundSize: "cover",
                }}
              >
                <Ambient rarity={card.rarity}>
                  <img
                    src={card.img}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Ambient>

                <Box
                  sx={{
                    position: "absolute",
                    left: "50%",
                    bottom: "6px",
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "rgba(60, 60, 60, 0.5)",
                      borderRadius: "40px",
                      padding: "4px 8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Typography
                      sx={{
                        color: colors.textColor,
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {card.name}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  sx={{
                    position: "absolute",
                    left: "12px",
                    top: "12px",
                    fontSize: "16px",
                  }}
                >
                  {card.tier}
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box>
        <Button onClick={startSpin} disabled={isSpinning}>
          Spin
        </Button>
      </Box>
    </Box>
  );
};
