const isProd = process.env.NEXT_PUBLIC_SITE_URL === "https://sapienstudio.art";
export const PRODUCT_OPTIONS = [
  {
    credits: 5,
    priceId: isProd ? "" : "price_1T9TJKBP1kK4GGixwiTQh1Ja",
    lineItem: {
      price_data: {
        currency: "usd",
        product: "prod_U7ikuxD9l4Sxn5",
        unit_amount: 100,
      },
      quantity: 1,
    },
  },
];
