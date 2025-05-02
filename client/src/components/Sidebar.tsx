import { VideoCategory } from "@shared/schema";
import { categories } from "../lib/categories";

interface SidebarProps {
  selectedCategory: VideoCategory;
  onCategoryChange: (category: VideoCategory) => void;
}

export default function Sidebar({ selectedCategory, onCategoryChange }: SidebarProps) {
  return (
    <aside className="w-full md:w-64 shrink-0 hidden md:block">
      <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Categories</h3>
        <nav className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`flex items-center w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                selectedCategory === category.id
                  ? "text-gray-900 bg-gray-100"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              <i className={`${category.icon} mr-3 text-gray-500`}></i>
              <span>{category.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Quality Filters</h3>
