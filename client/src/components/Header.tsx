import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Video, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/category/all" },
    { name: "Popular", href: "/popular" },
    { name: "About", href: "/about" }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Video className="h-8 w-8 text-primary mr-2" />
            <span className="text-2xl font-bold font-poppins text-primary">AnimClips</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={`font-medium font-poppins ${
