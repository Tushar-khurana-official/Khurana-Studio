import { AdminSidebar } from "@/components/admin/sidebar";
import { useGetStudioStats, useListBookings, getListBookingsQueryKey } from "@workspace/api-client-react";
import { format } from "date-fns";
import { BarChart3, Users, Image as ImageIcon, Calendar as CalendarIcon, ArrowUpRight, PenTool } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";

export const AdminDashboardPage = () => {
  const { data: stats, isLoading: statsLoading } = useGetStudioStats();
  const { data: bookings, isLoading: bookingsLoading } = useListBookings(
    { status: 'pending' },
    { query: { queryKey: getListBookingsQueryKey({ status: 'pending' }) } }
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AdminSidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-serif text-3xl text-foreground">Dashboard</h1>
              <p className="font-sans text-sm text-muted-foreground mt-1">Overview of your studio operations.</p>
            </div>
            <div className="font-sans text-sm text-muted-foreground">
              {format(new Date(), 'EEEE, MMMM d, yyyy')}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Total Bookings", value: stats?.totalBookings || 0, icon: CalendarIcon, color: "text-blue-500" },
              { label: "Pending Inquiries", value: stats?.pendingBookings || 0, icon: BarChart3, color: "text-amber-500" },
              { label: "Happy Clients", value: stats?.happyClients || 0, icon: Users, color: "text-green-500" },
              { label: "Photos Delivered", value: stats?.photosDelivered || 0, icon: ImageIcon, color: "text-purple-500" },
            ].map((stat, i) => (
              <div key={i} className="bg-card border border-border p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-md bg-muted ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                </div>
                {statsLoading ? (
                  <Skeleton className="h-8 w-16 mb-2" />
                ) : (
                  <div className="font-sans text-3xl font-medium text-foreground mb-1">
                    {stat.value}
                  </div>
                )}
                <div className="font-sans text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Inquiries */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-xl text-foreground">Pending Inquiries</h2>
                <Link href="/admin/bookings" className="text-sm font-sans text-muted-foreground hover:text-foreground flex items-center gap-1">
                  View All <ArrowUpRight size={14} />
                </Link>
              </div>
              
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                {bookingsLoading ? (
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : bookings?.length === 0 ? (
                  <div className="p-12 text-center text-muted-foreground font-sans text-sm">
                    No pending inquiries.
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {bookings?.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="font-sans font-medium text-foreground mb-1">{booking.name}</div>
                          <div className="font-sans text-sm text-muted-foreground flex gap-2 items-center">
                            <span>{booking.serviceType}</span>
                            <span>•</span>
                            <span>{format(new Date(booking.preferredDate), 'MMM d, yyyy')}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded-full text-xs font-sans font-medium bg-amber-500/10 text-amber-600 border border-amber-500/20">
                            Pending
                          </span>
                          <button className="text-sm font-sans text-foreground border border-border px-3 py-1.5 rounded hover:bg-muted transition-colors">
                            Review
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="font-serif text-xl text-foreground mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-studio-silver transition-colors text-left group">
                  <div className="p-2 bg-muted rounded group-hover:bg-studio-silver/10 transition-colors">
                    <ImageIcon size={18} className="text-foreground" />
                  </div>
                  <div>
                    <div className="font-sans text-sm font-medium text-foreground">Upload Portfolio</div>
                    <div className="font-sans text-xs text-muted-foreground">Add new gallery images</div>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-studio-silver transition-colors text-left group">
                  <div className="p-2 bg-muted rounded group-hover:bg-studio-silver/10 transition-colors">
                    <PenTool size={18} className="text-foreground" />
                  </div>
                  <div>
                    <div className="font-sans text-sm font-medium text-foreground">New Journal Post</div>
                    <div className="font-sans text-xs text-muted-foreground">Write a new blog article</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
