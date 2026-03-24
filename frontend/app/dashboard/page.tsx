"use client";

import { useEffect, useState } from "react";
import { LayoutDashboard, LogOut, Building2, Users, Receipt, Settings } from "lucide-react";

export default function DashboardPage() {
  const [org, setOrg] = useState<any>(null);

  useEffect(() => {
    const storedOrg = localStorage.getItem("org");
    if (storedOrg) {
      setOrg(JSON.parse(storedOrg));
    } else {
      window.location.href = "/";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("org");
    window.location.href = "/";
  };

  if (!org) return null;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white">
            <Building2 className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">O2C</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-sm flex items-center gap-3">
            <LayoutDashboard className="h-4 w-4" />
            <span className="text-sm font-medium">Dashboard</span>
          </div>
          <div className="hover:bg-accent/50 px-4 py-2 rounded-sm flex items-center gap-3 cursor-pointer transition-colors">
            <Receipt className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Invoices</span>
          </div>
          <div className="hover:bg-accent/50 px-4 py-2 rounded-sm flex items-center gap-3 cursor-pointer transition-colors">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Customers</span>
          </div>
          <div className="hover:bg-accent/50 px-4 py-2 rounded-sm flex items-center gap-3 cursor-pointer transition-colors">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Settings</span>
          </div>
        </nav>
        <div className="p-4 border-t border-border">
          <button 
            onClick={handleLogout}
            className="w-full btn-outline flex items-center gap-3 justify-start !text-error hover:!bg-error/5 border-none"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold">Overview</h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{org.name}</p>
              <p className="text-xs text-muted-foreground">{org.email}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center font-bold text-primary">
              {org.name[0]}
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-surface p-6 space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <h3 className="text-3xl font-bold">$128,430.00</h3>
              <p className="text-xs text-success-foreground bg-accent/30 inline-block px-2 py-1 rounded-full">+12% from last month</p>
            </div>
            <div className="card-surface p-6 space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Pending Invoices</p>
              <h3 className="text-3xl font-bold">24</h3>
              <p className="text-xs text-warning inline-block px-2 py-1 rounded-full">Requires attention</p>
            </div>
            <div className="card-surface p-6 space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Active Customers</p>
              <h3 className="text-3xl font-bold">142</h3>
              <p className="text-xs text-primary inline-block px-2 py-1 rounded-full">+5 new this week</p>
            </div>
          </div>

          <div className="card-surface p-8 h-64 flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center">
              <Receipt className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-semibold">Ready to start?</h4>
              <p className="text-muted-foreground max-w-sm mx-auto text-sm">
                You haven't created any invoices yet. Start by adding your first customer or creating a new invoice.
              </p>
            </div>
            <button className="btn-primary">Create First Invoice</button>
          </div>
        </div>
      </main>
    </div>
  );
}
