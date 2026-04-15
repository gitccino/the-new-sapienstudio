import NavigationBar from "@/components/shared/navigation-bar";

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavigationBar />
      {children}
    </div>
  );
}
