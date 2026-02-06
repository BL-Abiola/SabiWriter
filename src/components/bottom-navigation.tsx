"use client";

import { Share2, Tags, ShoppingBag, History, Instagram, MessageCircle, Twitter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

type View = 'instagram' | 'whatsapp' | 'twitter' | 'tagline' | 'product' | 'history';

type BottomNavigationProps = {
    activeView: View;
    setActiveView: (view: View) => void;
};

export function BottomNavigation({ activeView, setActiveView }: BottomNavigationProps) {
    const isSocialView = ['instagram', 'whatsapp', 'twitter'].includes(activeView);

    const navItems = [
        { id: 'tagline', label: 'Tagline', icon: Tags },
        { id: 'product', label: 'Product', icon: ShoppingBag },
        { id: 'history', label: 'History', icon: History },
    ];

    const navItemClasses = "flex flex-col items-center justify-center h-full text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:text-primary";
    const activeClasses = "text-primary";

    return (
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-background/95 backdrop-blur-sm border-t md:hidden">
            <div className="grid h-full grid-cols-4 max-w-lg mx-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className={cn(navItemClasses, isSocialView && activeClasses)}>
                            <Share2 className="h-6 w-6" />
                            <span className="text-xs font-medium">Social</span>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" side="top" className="mb-4">
                        <DropdownMenuItem onClick={() => setActiveView('instagram')}>
                            <Instagram className="mr-2 h-4 w-4" />
                            <span>Instagram</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setActiveView('whatsapp')}>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            <span>WhatsApp</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setActiveView('twitter')}>
                            <Twitter className="mr-2 h-4 w-4" />
                            <span>X / Twitter</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {navItems.map((item) => (
                    <button 
                        key={item.id}
                        className={cn(navItemClasses, activeView === item.id && activeClasses)}
                        onClick={() => setActiveView(item.id as View)}
                    >
                        <item.icon className="h-6 w-6" />
                        <span className="text-xs font-medium">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}