import CollectionCard from "@/components/collections/collection-card";
import { COLLECTION_META } from "@/constants/collections-meta";

export default function CollectionPage() {
  return (
    <main className="main-container grid grid-cols-1 sm:grid-cols-2 gap-4">
      {COLLECTION_META.map((collection) => (
        <CollectionCard key={collection.id} meta={collection} />
      ))}
    </main>
  );
}
