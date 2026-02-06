'use client';

import {
  History,
  Instagram,
  MessageCircle,
  Settings,
  ShoppingBag,
  Tags,
  Twitter,
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
import { useSettings, type GeneratorId } from '@/context/settings-context';

type AppLayoutProps = {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
};

const allMenuItems: { id: string; label: string; icon: React.ElementType }[] = [
    { id: 'instagram', label: 'Instagram Bio', icon: Instagram },
    { id: 'whatsapp', label: 'WhatsApp Info', icon: MessageCircle },
    { id: 'twitter', label: 'X / Twitter', icon: Twitter },
    { id: 'product', label: 'Product Description', icon: ShoppingBag },
    { id: 'tagline', label: 'Tagline', icon: Tags },
    { id: 'history', label: 'History', icon: History },
];

export function AppLayout({
  children,
  activeView,
  setActiveView,
}: AppLayoutProps) {
    const { enabledGenerators } = useSettings();

    const menuItems = allMenuItems.filter(item => {
        if (item.id === 'history') return true;
        return enabledGenerators[item.id as GeneratorId];
      });

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
            <DialogContent className="sm:max-w-md rounded-3xl">
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
              </DialogHeader>
              <SettingsComponent />
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
