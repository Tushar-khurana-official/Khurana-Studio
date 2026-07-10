import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Image as ImageIcon, 
  Settings, 
  LogOut,
  CreditCard,
  PenTool,
  Star
} from "lucide-react";

interface AdminSidebarProps {
  className?: string;
}

export const AdminSidebar = ({ className = "" }: AdminSidebarProps) => {
  const [location] = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Bookings", path: "/admin/bookings", icon: Calendar },
    { name: "Portfolio", path: "/admin/portfolio", icon: ImageIcon },
    { name: "Blog", path: "/admin/blog", icon: PenTool },
    { name: "Reviews", path: "/admin/reviews", icon: Star },
    { name: "Clients", path: "/admin/clients", icon: Users },
    { name: "Payments", path: "/admin/payments", icon: CreditCard },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className={`w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col ${className}`}>
      <div className="p-6 pb-10">
        <Link href="/" className="flex items-baseline gap-1">
          <span className="font-serif text-3xl font-bold tracking-widest text-sidebar-primary">KS</span>
          <span className="font-sans text-[0.65rem] tracking-[0.3em] font-medium uppercase text-sidebar-foreground/60">
            Admin
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-md font-sans text-sm transition-colors ${
                isActive 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-studio-silver' : 'opacity-70'} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border mt-auto">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-md font-sans text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors">
          <LogOut size={18} className="opacity-70" />
          Log Out
        </button>
      </div>
    </aside>
  );
};
