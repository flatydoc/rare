import Bronze from "../../assets/bronze.png";
import Silver from "../../assets/silver.png";
import Gold from "../../assets/gold.png";
import { colors } from "../../core/theme/colors";
import { IReward } from "../../core/types";

export const imgByLeague: Record<string, string> = {
  Bronze,
  Silver,
  Gold,
};

export const rewardByLeague: IReward[] = [
  {
    id: 1,
    league: "Bronze",
    reward: "+ 3 000 $GUM",
    rewardValue: 3000,
    rewardColor: colors.common,
    rewardType: "inGame",
    isClaimed: false,
  },
  {
    id: 2,
    league: "Silver",
    reward: "+ 5 000 $GUM",
    rewardValue: 5000,
    rewardColor: colors.common,
    rewardType: "inGame",
    isClaimed: false,
  },
  {
    id: 3,
    league: "Gold",
    reward: "+1 Rare Pack",
    rewardColor: colors.rare,
    rewardType: "pack",
    isClaimed: false,
  },
  {
    id: 4,
    league: "Diamond",
    reward: "20 $NOT",
    rewardColor: colors.legendary,
    rewardType: "not",
    isClaimed: false,
  },
];
