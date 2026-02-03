import { Header } from '@/components/header';
import { InstagramGenerator } from '@/components/instagram-generator';
import { TaglineGenerator } from '@/components/tagline-generator';
import { WhatsappGenerator } from '@/components/whatsapp-generator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Instagram, MessageCircle, Tags } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-5xl space-y-8">
        <Header />
        <Tabs defaultValue="instagram" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="instagram">
              <Instagram className="mr-2 h-4 w-4" />
              Instagram Bio
            </TabsTrigger>
            <TabsTrigger value="whatsapp">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp Info
            </TabsTrigger>
            <TabsTrigger value="tagline">
              <Tags className="mr-2 h-4 w-4" />
              Tagline
            </TabsTrigger>
          </TabsList>
          <TabsContent value="instagram" className="mt-6">
            <InstagramGenerator />
          </TabsContent>
          <TabsContent value="whatsapp" className="mt-6">
            <WhatsappGenerator />
          </TabsContent>
          <TabsContent value="tagline" className="mt-6">
            <TaglineGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
