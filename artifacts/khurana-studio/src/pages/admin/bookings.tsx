import { AdminSidebar } from "@/components/admin/sidebar";
import { useListBookings, getListBookingsQueryKey, useUpdateBookingStatus } from "@workspace/api-client-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Check, X, Clock } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export const AdminBookingsPage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const { data: bookings, isLoading } = useListBookings(
    {},
    { query: { queryKey: getListBookingsQueryKey() } }
  );

  const updateStatus = useUpdateBookingStatus();

  const handleStatusUpdate = (id: number, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    updateStatus.mutate(
      { id, data: { status } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListBookingsQueryKey() });
          toast({
            title: "Status Updated",
            description: `Booking status changed to ${status}.`,
          });
        }
      }
    );
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'confirmed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-sans font-medium bg-green-500/10 text-green-600 border border-green-500/20 flex items-center gap-1"><Check size={12}/> Confirmed</span>;
      case 'completed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-sans font-medium bg-blue-500/10 text-blue-600 border border-blue-500/20">Completed</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 rounded-full text-xs font-sans font-medium bg-red-500/10 text-red-600 border border-red-500/20 flex items-center gap-1"><X size={12}/> Cancelled</span>;
      case 'pending':
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-sans font-medium bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center gap-1"><Clock size={12}/> Pending</span>;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AdminSidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-serif text-3xl text-foreground">Bookings</h1>
              <p className="font-sans text-sm text-muted-foreground mt-1">Manage inquiries and scheduled sessions.</p>
            </div>
            <button className="bg-foreground text-background px-4 py-2 text-sm font-sans rounded-md hover:bg-studio-silver hover:text-foreground transition-colors">
              Export CSV
            </button>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-muted-foreground">
                    <th className="p-4 font-medium">Client</th>
                    <th className="p-4 font-medium">Service</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Budget</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i}>
                        <td className="p-4"><Skeleton className="h-4 w-32" /><Skeleton className="h-3 w-24 mt-2" /></td>
                        <td className="p-4"><Skeleton className="h-4 w-24" /></td>
                        <td className="p-4"><Skeleton className="h-4 w-24" /></td>
                        <td className="p-4"><Skeleton className="h-4 w-16" /></td>
                        <td className="p-4"><Skeleton className="h-6 w-20 rounded-full" /></td>
                        <td className="p-4 text-right"><Skeleton className="h-8 w-8 ml-auto" /></td>
                      </tr>
                    ))
                  ) : bookings?.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-muted-foreground">No bookings found.</td>
                    </tr>
                  ) : (
                    bookings?.map((booking) => (
                      <tr key={booking.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-foreground">{booking.name}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{booking.email}</div>
                          <div className="text-xs text-muted-foreground">{booking.phone}</div>
                        </td>
                        <td className="p-4">
                          <div className="capitalize">{booking.serviceType}</div>
                          {booking.packageType && <div className="text-xs text-muted-foreground capitalize mt-0.5">{booking.packageType} Pkg</div>}
                        </td>
                        <td className="p-4">
                          {format(new Date(booking.preferredDate), 'MMM d, yyyy')}
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {booking.budget || '-'}
                        </td>
                        <td className="p-4">
                          {getStatusBadge(booking.status)}
                        </td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="p-2 hover:bg-muted rounded-md transition-colors focus:outline-none">
                              <MoreVertical size={16} className="text-muted-foreground" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40 font-sans">
                              <DropdownMenuItem onClick={() => handleStatusUpdate(booking.id, 'confirmed')} className="cursor-pointer">Mark Confirmed</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(booking.id, 'completed')} className="cursor-pointer">Mark Completed</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(booking.id, 'cancelled')} className="cursor-pointer text-red-500">Cancel Booking</DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">View Details</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminBookingsPage;
