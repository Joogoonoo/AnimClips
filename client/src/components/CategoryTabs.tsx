import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Category } from "@shared/schema";

export default function CategoryTabs() {
  const [location] = useLocation();
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (isLoading) return <div className="py-6 bg-white">Loading categories...</div>;

  return (
    <section className="bg-white py-6 sticky top-16 z-40 shadow-sm">
      <div className="container mx-auto px-4">
        <ScrollArea className="w-full">
          <div className="flex items-center justify-start pb-2">
            <Link href="/category/all">
              <Button
                variant={location === "/category/all" ? "default" : "ghost"}
                className="mr-2 rounded-full font-medium font-poppins whitespace-nowrap"
              >
                All Clips
              </Button>
            </Link>
            
            {categories?.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`}>
                <Button
                  variant={location === `/category/${category.slug}` ? "default" : "ghost"}
                  className="mr-2 rounded-full font-medium font-poppins whitespace-nowrap"
                >
                  {category.name}
                </Button>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
