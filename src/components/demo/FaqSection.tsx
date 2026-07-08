import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export interface FaqItem {
  question: string
  answer: string
}

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <Accordion type="single" collapsible className="max-w-3xl mx-auto">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
