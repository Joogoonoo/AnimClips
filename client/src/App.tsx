import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import VideoDetails from "@/pages/VideoDetails";
import CategoryPage from "@/pages/CategoryPage";
import UploadVideo from "@/pages/UploadVideo";
import MainLayout from "@/components/MainLayout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/video/:id" component={VideoDetails} />
      <Route path="/category/:slug" component={CategoryPage} />
      <Route path="/upload" component={UploadVideo} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Router />
      </MainLayout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
