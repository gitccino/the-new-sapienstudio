"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  AiImageIcon,
  GiftIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { memo, useState } from "react";
import { CREDIT_OPTIONS } from "@/constants/billing";
import { cn } from "@/lib/utils";
import { Splitter } from "./splitter";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import {
  useQuery as useTQuery,
  useMutation as useTMutation,
} from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { PRODUCT_OPTIONS } from "@/convex/constants/payments";

export default function CreditDialog() {
  const balanceResult = useQuery(api.functions.credits.getBalance);

  if (!balanceResult || balanceResult.status !== "success") return null;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="xl">
          <HugeiconsIcon icon={Wallet01Icon} />
          <span>{balanceResult.balance}</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="ring-0 p-6 max-md:w-[85%] gap-2"
      >
        <DialogHeader>
          <DialogTitle className="mb-4 font-medium">Your Wallet</DialogTitle>
        </DialogHeader>

        <div className="h-12 px-4 rounded-md border-2 flex flex-row justify-start items-center gap-2">
          <HugeiconsIcon icon={Wallet01Icon} />
          <span>{balanceResult.balance} Credits</span>
        </div>

        <BuyMoreCredits />
        <Splitter className="bg-splitter-card" />
        <CreditDaily />
      </DialogContent>
    </Dialog>
  );
}

const BuyMoreCredits = memo(function BuyMoreCredits() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedOption = PRODUCT_OPTIONS[selectedIndex];

  const payWithStripe = useAction(api.payments.stripe.pay);
  const handlePayWithStrip = async () => {
    const paymentUrl = await payWithStripe({
      prodId: selectedOption.lineItem.price_data.product,
    });
    if (paymentUrl) window.location.href = paymentUrl;
  };

  return (
    <>
      <div className="flex flex-row justify-around gap-2">
        {CREDIT_OPTIONS.map((option, index) => (
          <button
            type="button"
            key={`credit-option-${option.id}`}
            className={cn(
              "w-full border-2 border-transparent rounded-md p-2 flex flex-col gap-1",
              selectedIndex === index && "border-border",
            )}
            onClick={() => setSelectedIndex(index)}
          >
            <div className="flex flex-row items-center justify-center gap-1 text-credit">
              <HugeiconsIcon icon={AiImageIcon} size={16} />
              <span>{option.credit}</span>
            </div>
            <span>${option.price}</span>
            <span className="text-muted-foreground text-[.6rem]">
              ${(option.price / option.credit).toFixed(3)}/credit
            </span>
          </button>
        ))}
      </div>
      <Button
        type="button"
        variant="secondaryCard"
        size="2xl"
        className="font-normal"
        onClick={handlePayWithStrip}
      >
        Buy {selectedOption.credits} credits
      </Button>
    </>
  );
});

const CreditDaily = memo(function CreditDaily() {
  const { data: statusData, isPending: isLoadingStatus } = useTQuery(
    convexQuery(api.functions.credits.getDailyClaimStatus),
  );
  const canClaim = statusData?.canClaim;

  const {
    data: claimData,
    mutate: claimDailyReward,
    isPending: isClaiming,
  } = useTMutation({
    mutationFn: useConvexMutation(api.functions.credits.claimDailyReward),
  });
  const isClaimSuccess = !claimData
    ? null
    : claimData.status === "success"
      ? true
      : false;

  return (
    <div>
      <Button
        variant="none"
        size="2xl"
        disabled={isLoadingStatus || canClaim === undefined || !canClaim}
        className="w-full bg-credit text-foreground dark:text-secondary-button font-normal"
        onClick={() => claimDailyReward({})}
      >
        <HugeiconsIcon icon={GiftIcon} />
        {canClaim === undefined
          ? "Loading claim status"
          : !canClaim
            ? "Already claimed"
            : isClaiming
              ? "Claiming reward..."
              : "Claim daily reward"}
      </Button>
      <span
        className={cn(
          "text-muted-foreground px-1 text-[.7rem]",
          isClaimSuccess && "text-success",
          isClaimSuccess === false && "text-destructive",
        )}
      >
        {!claimData
          ? "** Check back daily to claim free credit"
          : claimData.status === "success"
            ? claimData.message
            : claimData.status === "already_claimed"
              ? "Already claimed"
              : "Something went wrong"}
      </span>
    </div>
  );
});
