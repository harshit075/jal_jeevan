
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-6">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">{t('contact_title')}</h1>
          <p className="text-muted-foreground mt-2">
            {t('contact_description')}
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{t('contact_info_title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-primary" />
              <a href="mailto:info@aarogyajalsanket.com" className="hover:underline">info@aarogyajalsanket.com</a>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-primary" />
              <span>+91 123 456 7890</span>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <span>
                Aarogya jal Sanket Headquarters<br />
                Guwahati, Assam, India
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{t('contact_form_title')}</CardTitle>
          <CardDescription>{t('contact_form_description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t('contact_form_name_label')}</Label>
              <Input id="name" placeholder={t('contact_form_name_placeholder')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('contact_form_email_label')}</Label>
              <Input id="email" type="email" placeholder={t('contact_form_email_placeholder')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">{t('contact_form_message_label')}</Label>
              <Textarea id="message" placeholder={t('contact_form_message_placeholder')} rows={5} />
            </div>
            <Button type="submit" size="lg" className="w-full">
              <Send className="mr-2 h-4 w-4" />
              {t('contact_form_send_button')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
