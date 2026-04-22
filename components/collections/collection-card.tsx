import { CollectionMeta } from "@/constants/collections-meta";
import Image from "next/image";
import Link from "next/link";

export default function CollectionCard({ meta }: { meta: CollectionMeta }) {
  const { id, name, hero } = meta;
  return (
    <Link
      href={`/collections/${id}`}
      className="overflow-hidden h-48 relative rounded"
    >
      <Image
        src={hero.banner}
        alt={`${name} Banner`}
        fill
        className="object-cover"
      />
      <div className="mask-to-t-light bg-background/80 absolute bottom-0 left-0 h-20 w-full"></div>
      <div className="absolute bottom-2 left-0 flex h-fit w-full flex-col items-start px-4">
        <span className="text-foreground text-lg leading-4 font-black">
          {name} Collection
        </span>
        <span className="text-card-background px-2 text-[.5rem] whitespace-nowrap">
          {hero.description}
        </span>
      </div>
    </Link>
  );
}
