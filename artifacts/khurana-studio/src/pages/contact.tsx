import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { useLenis } from "@/hooks/use-lenis";
import { FadeIn } from "@/components/fade-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@workspace/api-client-react";
import { useState } from "react";
import { CheckCircle2, Loader2, MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export const ContactPage = () => {
  useLenis();
  const [isSuccess, setIsSuccess] = useState(false);
  const submitContact = useSubmitContact();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitContact.mutate(
      { data: values },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
      }
    );
  }

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="min-h-[100dvh] bg-background pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-16">
            <h1 className="font-serif text-5xl md:text-7xl mb-6 text-foreground">Get in Touch</h1>
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto font-light">
              For press inquiries, brand collaborations, or general questions, please drop us a message.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <FadeIn direction="right">
              <div className="bg-card border border-border p-8 md:p-12">
                <h2 className="font-serif text-3xl mb-8">Send a Message</h2>
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 bg-studio-dark rounded-full flex items-center justify-center mx-auto mb-6 text-studio-silver">
                        <CheckCircle2 size={32} />
                      </div>
                      <h3 className="font-serif text-2xl mb-2">Message Sent</h3>
                      <p className="font-sans text-muted-foreground text-sm">We'll get back to you shortly.</p>
                      <Button 
                        variant="outline" 
                        className="mt-8 rounded-none border-border"
                        onClick={() => {
                          form.reset();
                          setIsSuccess(false);
                        }}
                      >
                        Send Another
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-sans text-xs uppercase tracking-widest">Name</FormLabel>
                                  <FormControl>
                                    <Input className="h-12 rounded-none border-border bg-transparent focus-visible:ring-1 focus-visible:ring-foreground" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-sans text-xs uppercase tracking-widest">Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" className="h-12 rounded-none border-border bg-transparent focus-visible:ring-1 focus-visible:ring-foreground" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Phone (Optional)</FormLabel>
                                  <FormControl>
                                    <Input type="tel" className="h-12 rounded-none border-border bg-transparent focus-visible:ring-1 focus-visible:ring-foreground" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="subject"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-sans text-xs uppercase tracking-widest">Subject</FormLabel>
                                  <FormControl>
                                    <Input className="h-12 rounded-none border-border bg-transparent focus-visible:ring-1 focus-visible:ring-foreground" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-sans text-xs uppercase tracking-widest">Message</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    className="min-h-[120px] rounded-none border-border bg-transparent focus-visible:ring-1 focus-visible:ring-foreground resize-y" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button 
                            type="submit" 
                            disabled={submitContact.isPending}
                            className="w-full h-12 rounded-none font-sans text-sm uppercase tracking-widest bg-foreground text-background hover:bg-studio-silver hover:text-foreground transition-colors"
                          >
                            {submitContact.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Message"}
                          </Button>
                        </form>
                      </Form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                  <div>
                    <div className="flex items-center gap-3 mb-4 text-foreground">
                      <MapPin size={20} className="text-studio-silver" />
                      <h3 className="font-serif text-xl">Studio Visit</h3>
                    </div>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                      12, Studio Lane, <br />
                      Connaught Place,<br />
                      New Delhi – 110001
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-4 text-foreground">
                      <Clock size={20} className="text-studio-silver" />
                      <h3 className="font-serif text-xl">Hours</h3>
                    </div>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                      Mon–Sat: 10:00 AM – 7:00 PM<br />
                      Sunday: By Appointment Only
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-4 text-foreground">
                      <Phone size={20} className="text-studio-silver" />
                      <h3 className="font-serif text-xl">Phone</h3>
                    </div>
                    <p className="font-sans text-sm text-muted-foreground">
                      +91 98765 43210<br />
                      +91 11 4567 8900
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-4 text-foreground">
                      <Mail size={20} className="text-studio-silver" />
                      <h3 className="font-serif text-xl">Email</h3>
                    </div>
                    <p className="font-sans text-sm text-muted-foreground">
                      hello@khuranas.studio<br />
                      bookings@khuranas.studio
                    </p>
                  </div>
                </div>

                <div className="flex-grow w-full bg-studio-bg-alt border border-border min-h-[300px] relative grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114827184232!2d77.21557999999999!3d28.63273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
