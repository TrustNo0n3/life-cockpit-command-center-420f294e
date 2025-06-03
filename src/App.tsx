
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Index from "./pages/Index";
import Financial from "./pages/Financial";
import Work from "./pages/Work";
import BrainPage from "./pages/Brain";
import Physique from "./pages/Physique";
import Mind from "./pages/Mind";
import Soul from "./pages/Soul";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="life-dashboard-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/financial" element={<Financial />} />
            <Route path="/work" element={<Work />} />
            <Route path="/brain" element={<BrainPage />} />
            <Route path="/physique" element={<Physique />} />
            <Route path="/mind" element={<Mind />} />
            <Route path="/soul" element={<Soul />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
