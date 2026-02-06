'use client';

import {
  History,
  Instagram,
  MessageCircle,
  Settings,
  Tags,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { Settings as SettingsComponent } from '@/components/settings';
import { Header } from '@/components/header';

type AppLayoutProps = {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
};

const menuItems = [
    { id: 'instagram', label: 'Instagram Bio', icon: Instagram },
    { id: 'whatsapp', label: 'WhatsApp Info', icon: MessageCircle },
    { id: 'tagline', label: 'Tagline', icon: Tags },
    { id: 'history', label: 'History', icon: History },
];

export function AppLayout({
  children,
  activeView,
  setActiveView,
}: AppLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-semibold">NaijaBizBio</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => setActiveView(item.id)}
                  isActive={activeView === item.id}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings />
                <span className="group-data-[collapsible=icon]:hidden">
                  Settings
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xs rounded-3xl">
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <SettingsComponent />
              </div>
            </DialogContent>
          </Dialog>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 sm:p-6 lg:p-8">
            <Header />
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
