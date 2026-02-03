import { Header } from '@/components/header';
import { InstagramGenerator } from '@/components/instagram-generator';
import { TaglineGenerator } from '@/components/tagline-generator';
import { WhatsappGenerator } from '@/components/whatsapp-generator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-4xl space-y-8">
        <Header />
        <Tabs defaultValue="instagram" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card border">
            <TabsTrigger value="instagram">Instagram Bio</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp Info</TabsTrigger>
            <TabsTrigger value="tagline">Tagline</TabsTrigger>
          </TabsList>
          <TabsContent value="instagram">
            <InstagramGenerator />
          </TabsContent>
          <TabsContent value="whatsapp">
            <WhatsappGenerator />
          </TabsContent>
          <TabsContent value="tagline">
            <TaglineGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
