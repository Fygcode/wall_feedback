
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

interface TestimonialEmbedProps {
  companySlug: string;
}

const TestimonialEmbed: React.FC<TestimonialEmbedProps> = ({ companySlug }) => {
  const [copied, setCopied] = useState<string | null>(null);
  
  const baseUrl = window.location.origin;
  const embedUrl = `${baseUrl}/embed/${companySlug}`;
  const wallUrl = `${baseUrl}/wall/${companySlug}`;
  
  // Generate embed code options
  const iframeEmbed = `<iframe src="${embedUrl}" width="100%" height="600px" frameborder="0" scrolling="yes"></iframe>`;
  const scriptEmbed = `<div id="wallfeedback-testimonials"></div>
<script src="${baseUrl}/embed.js" data-company="${companySlug}"></script>`;
  
  const handleCopy = (code: string, type: string) => {

    console.log("CODE ", code);

    navigator.clipboard.writeText(code);
    setCopied(type);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
          Embed Wall
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Embed Your Testimonial Wall</DialogTitle>
          <DialogDescription>
            Choose how you want to embed your testimonials on your website.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="iframe" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="iframe">iFrame Embed</TabsTrigger>
            <TabsTrigger value="script">JavaScript Embed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="iframe" className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-md font-mono text-sm overflow-x-auto">
              {iframeEmbed}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Simple embed that works everywhere
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleCopy(iframeEmbed, 'iframe')}
              >
                {copied === 'iframe' ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Code
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="script" className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-md font-mono text-sm overflow-x-auto">
              {scriptEmbed}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Advanced embed with more customization options
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleCopy(scriptEmbed, 'script')}
              >
                {copied === 'script' ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Code
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Preview your embed wall:
          </p>
          <Button 
            variant="outline" 
            size="sm"
            asChild
          >
            <Link to={embedUrl} target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              Preview Embed
            </Link>
          </Button>
        </div>
        
        <div className="mt-6 p-4 bg-purple-50 rounded-md">
          <h3 className="text-sm font-medium text-purple-800 mb-2">Need Help?</h3>
          <p className="text-sm text-purple-700">
            For more customization options or if you need assistance with embedding, check our 
            <a href="#" className="text-purple-900 underline ml-1">documentation</a> or 
            <a href="#" className="text-purple-900 underline ml-1">contact support</a>.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialEmbed;
