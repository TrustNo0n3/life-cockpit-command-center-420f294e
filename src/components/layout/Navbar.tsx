
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-full bg-primary p-1.5 text-primary-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard">
                <rect width="7" height="9" x="3" y="3" rx="1"/>
                <rect width="7" height="5" x="14" y="3" rx="1"/>
                <rect width="7" height="9" x="14" y="12" rx="1"/>
                <rect width="7" height="5" x="3" y="16" rx="1"/>
              </svg>
            </div>
            <span className="text-lg font-semibold">LifeOS</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          <Link to="/" className="px-4 py-2 text-sm font-medium">Dashboard</Link>
          <Link to="/financial" className="px-4 py-2 text-sm font-medium">Financial</Link>
          <Link to="/work" className="px-4 py-2 text-sm font-medium">Work</Link>
          <Link to="/brain" className="px-4 py-2 text-sm font-medium">Brain</Link>
          <Link to="/physique" className="px-4 py-2 text-sm font-medium">Physique</Link>
          <Link to="/mind" className="px-4 py-2 text-sm font-medium">Mind</Link>
          <Link to="/soul" className="px-4 py-2 text-sm font-medium">Soul</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            <span className="sr-only md:not-sr-only md:inline-block">Notifications</span>
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full">
            <span className="sr-only">Profile</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
