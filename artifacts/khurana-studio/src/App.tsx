import { Route, Switch, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import Home from '@/pages/home';
import PortfolioPage from '@/pages/portfolio';
import BookPage from '@/pages/book';
import ContactPage from '@/pages/contact';
import ServicesPage from '@/pages/services';
import BlogPage from '@/pages/blog';
import BlogPostPage from '@/pages/blog-post';
import AdminDashboardPage from '@/pages/admin/dashboard';
import AdminBookingsPage from '@/pages/admin/bookings';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/book" component={BookPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      
      {/* Admin Routes */}
      <Route path="/admin" component={AdminDashboardPage} />
      <Route path="/admin/bookings" component={AdminBookingsPage} />
      
      {/* Admin Placeholders */}
      <Route path="/admin/portfolio" component={AdminDashboardPage} />
      <Route path="/admin/blog" component={AdminDashboardPage} />
      <Route path="/admin/reviews" component={AdminDashboardPage} />
      <Route path="/admin/clients" component={AdminDashboardPage} />
      <Route path="/admin/payments" component={AdminDashboardPage} />
      <Route path="/admin/settings" component={AdminDashboardPage} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
