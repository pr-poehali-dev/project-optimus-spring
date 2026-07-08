import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Icon from "@/components/ui/icon"

export interface Review {
  name: string
  text: string
  rating: number
  date: string
}

interface ReviewsSectionProps {
  reviews: Review[]
  accentClass?: string
  title?: string
}

export function ReviewsSection({ reviews, accentClass = "text-primary", title = "Отзывы клиентов" }: ReviewsSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review, i) => (
        <Card
          key={review.name}
          className="border-none shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
          style={{ animationDelay: `${i * 0.08}s` }}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Avatar>
                <AvatarFallback className={`${accentClass} bg-current/10 font-semibold`}>
                  {review.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.date}</p>
              </div>
            </div>
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Icon
                  key={idx}
                  name="Star"
                  className={`h-4 w-4 ${idx < review.rating ? `${accentClass} fill-current` : "text-muted-foreground/30"}`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
