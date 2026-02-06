'use client';

import {
    Facebook,
    History,
    Instagram,
    MessageCircle,
    ShoppingBag,
    Tags,
    Twitter,
} from 'lucide-react';
import { useSettings, type GeneratorId } from '@/context/settings-context';
import { cn } from '@/lib/utils';

type NavigationProps = {
  activeView: string;
  setActiveView: (view: string) => void;
};

const allMenuItems: { id: GeneratorId | 'history' ; label: string; icon: React.ElementType }[] = [
    { id: 'instagram', label: 'Instagram Bio', icon: Instagram },
    { id: 'facebook', label: 'Facebook Post', icon: Facebook },
    { id: 'whatsapp', label: 'WhatsApp Info', icon: MessageCircle },
    { id: 'twitter', label: 'X / Twitter', icon: Twitter },
    { id: 'product', label: 'Product Description', icon: ShoppingBag },
    { id: 'tagline', label: 'Tagline', icon: Tags },
    { id: 'history', label: 'History', icon: History },
];

export function Navigation({ activeView, setActiveView }: NavigationProps) {
    const { enabledGenerators } = useSettings();

    const menuItems = allMenuItems.filter(item => {
        if (item.id === 'history') return true;
        return enabledGenerators[item.id as GeneratorId];
    });

    return (
        <div className="mb-8">
            <div className="sm:hidden">
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-input bg-background focus:ring-primary focus:border-primary"
                    value={activeView}
                    onChange={(e) => setActiveView(e.target.value)}
                >
                    {menuItems.map((tab) => (
                        <option key={tab.id} value={tab.id}>{tab.label}</option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-border">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {menuItems.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveView(tab.id)}
                            className={cn(
                            'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm',
                            tab.id === activeView
                                ? 'border-primary text-primary'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                            )}
                        >
                            {tab.label}
                        </button>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
