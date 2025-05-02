import { useState, FormEvent } from "react";
import { useLocation } from "wouter";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@shared/schema";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      setLocation(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value) {
      setLocation(`/category/${value}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
      <div className="relative flex-grow">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-6 py-6 rounded-full text-neutral-dark font-inter focus:ring-2 focus:ring-secondary shadow-lg"
          placeholder="Search animation clips..."
        />
        <Button
          type="submit"
          variant="ghost"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-dark"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
      <div className="md:w-48">
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full px-6 py-6 rounded-full text-neutral-dark font-inter focus:ring-2 focus:ring-secondary shadow-lg">
            <SelectValue placeholder="Categories" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}
