import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FadeIn } from "@/components/fade-in";

const faqs = [
  {
    question: "How far in advance should we book?",
    answer: "For weddings, we recommend booking 6 to 12 months in advance, especially for dates during peak season. For portraits and editorial sessions, 4 to 6 weeks is usually sufficient."
  },
  {
    question: "Do you travel for destination weddings?",
    answer: "Yes, we frequently travel globally for destination weddings and editorial shoots. We hold valid passports and love capturing stories in new environments. Travel fees are quoted custom based on the location."
  },
  {
    question: "When will we receive our photos?",
    answer: "We deliver a 'sneak peek' gallery within 48 hours of your event. The full comprehensive gallery is delivered within 4 to 6 weeks, meticulously edited to our signature cinematic standard."
  },
  {
    question: "How many images will we receive?",
    answer: "While we prioritize quality over quantity, a typical 10-hour wedding yields between 500-800 fully edited images. Every image delivered is individually retouched."
  },
  {
    question: "Do you provide raw, unedited files?",
    answer: "We do not provide RAW files. A significant part of the Khurana Studio aesthetic is our post-production color grading and retouching. Providing unfinished work goes against our commitment to delivering a polished, luxury product."
  },
  {
    question: "What is your payment schedule?",
    answer: "A 40% retainer and signed contract are required to secure your date. The remaining balance is divided into two parts, with the final payment due 30 days prior to your event."
  }
];

export const FaqSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="text-center mb-16">
          <FadeIn>
            <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-4 block">
              Information
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              Frequently Asked Questions
            </h2>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border py-2">
                <AccordionTrigger className="font-serif text-xl hover:text-studio-silver transition-colors text-left hover:no-underline [&[data-state=open]]:text-studio-silver">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-muted-foreground font-light leading-relaxed text-base pt-2 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
};
