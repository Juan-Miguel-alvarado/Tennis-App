import { countryFlag, countryFlagLg } from "@/lib/utils"

interface CountryFlagProps {
  iso3: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function CountryFlag({ iso3, size = "sm", className = "" }: CountryFlagProps) {
  const src = size === "lg" ? countryFlagLg(iso3) : countryFlag(iso3)
  if (!src) return <span className={`text-xs text-muted-foreground ${className}`}>{iso3}</span>

  return (
    <img
      src={src}
      alt={iso3}
      className={`inline-block object-cover rounded-sm ${size === "lg" ? "w-8 h-6" : size === "md" ? "w-6 h-4" : "w-5 h-[14px]"} ${className}`}
      loading="lazy"
    />
  )
}
