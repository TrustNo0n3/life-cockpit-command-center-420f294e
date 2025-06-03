
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, Home, DollarSign, Briefcase, Brain, Dumbbell, BookOpen, Star } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Financial", href: "/financial", icon: DollarSign },
    { name: "Work", href: "/work", icon: Briefcase },
    { name: "Brain", href: "/brain", icon: Brain },
    { name: "Physique", href: "/physique", icon: Dumbbell },
    { name: "Mind", href: "/mind", icon: BookOpen },
    { name: "Soul", href: "/soul", icon: Star },
  ];

  return (
    <nav className="bg-background border-b border-border">
      <div className="container">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-primary">
                Life Dashboard
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center gap-2 px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      location.pathname === item.href
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <ThemeToggle />
          </div>
          <div className="sm:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 border-l-4 py-2 pl-3 pr-4 text-base font-medium transition-colors ${
                    location.pathname === item.href
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
