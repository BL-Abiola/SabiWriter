"use client";

import {
    Facebook,
    History,
    Instagram,
    MessageCircle,
    ShoppingBag,
    Tags,
    Twitter,
    Users,
    ChevronDown
} from 'lucide-react';
import { useSettings, type GeneratorId } from '@/context/settings-context';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type NavigationProps = {
  activeView: string;
  setActiveView: (view: string) => void;
};

const socialMenuItems: { id: GeneratorId; label: string; icon: React.ElementType }[] = [
    { id: 'facebook', label: 'Facebook', icon: Facebook },
    { id: 'instagram', label: 'Instagram', icon: Instagram },
    { id: 'twitter', label: 'X / Twitter', icon: Twitter },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
];

const otherMenuItems: { id: 'product' | 'tagline' | 'history' ; label: string; icon: React.ElementType }[] = [
    { id: 'product', label: 'Product', icon: ShoppingBag },
    { id: 'tagline', label: 'Tagline', icon: Tags },
    { id: 'history', label: 'History', icon: History },
];


export function Navigation({ activeView, setActiveView }: NavigationProps) {
    const { enabledGenerators } = useSettings();

    const enabledSocialItems = socialMenuItems
        .filter(item => enabledGenerators[item.id])
        .sort((a, b) => a.label.localeCompare(b.label));

    const enabledOtherItems = otherMenuItems.filter(item => {
        if (item.id === 'history') return true;
        return enabledGenerators[item.id as GeneratorId];
    });

    const isSocialActive = enabledSocialItems.some(item => item.id === activeView);

    const baseButtonClass = 'group inline-flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium';
    const activeClass = 'border-primary text-primary';
    const inactiveClass = 'border-transparent text-muted-foreground hover:border-border hover:text-foreground';

    return (
        <div className="mb-8">
            <div className="border-b border-border">
                <nav className="-mb-px flex w-full" aria-label="Tabs">
                    {enabledSocialItems.length > 0 && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className={cn(baseButtonClass, isSocialActive ? activeClass : inactiveClass, 'flex-1 justify-center')}>
                                    <Users className="h-5 w-5" />
                                    <span className="hidden sm:inline text-sm">Social</span>
                                    <ChevronDown className="ml-1 h-4 w-4 hidden sm:inline" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center">
                                {enabledSocialItems.map(item => (
                                    <DropdownMenuItem key={item.id} onClick={() => setActiveView(item.id)}>
                                        <item.icon className="mr-2 h-4 w-4" />
                                        <span>{item.label}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    {enabledOtherItems.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveView(tab.id)}
                            className={cn(
                                baseButtonClass,
                                tab.id === activeView ? activeClass : inactiveClass,
                                'flex-1 justify-center'
                            )}
                        >
                            <tab.icon className="h-5 w-5" />
                            <span className="hidden sm:inline text-sm">{tab.label}</span>
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
