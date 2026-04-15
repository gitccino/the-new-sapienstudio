import { SapiensBanner, VegetrBanner } from "@/assets";
import { StaticImageData } from "next/image";

export type CollectionMeta = {
  id: string;
  name: string;
  hero: {
    banner: StaticImageData;
    themeColor: string;
    credit: number;
    description: string;
  };
};

export const COLLECTION_META: CollectionMeta[] = [
  {
    id: "sapiens",
    name: "Sapiens",
    hero: {
      banner: SapiensBanner,
      themeColor: "#D88896",
      credit: 1,
      description:
        "Getting started and express your identity with a minimal character",
    },
  },
  {
    id: "vegetr",
    name: "Vegetr",
    hero: {
      banner: VegetrBanner,
      themeColor: "#50774B",
      credit: 3,
      description:
        "Nonsense vegetables is back!! Create them and let your craziness shine",
    },
  },
];
