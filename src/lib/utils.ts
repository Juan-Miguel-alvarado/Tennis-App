import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function surfaceColor(court: string): string {
  const map: Record<string, string> = {
    Hard: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    "I.hard": "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    Clay: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    Grass: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    Carpet: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
  }
  return map[court] ?? "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20"
}

export function tierColor(tier: string): string {
  if (tier.toLowerCase().includes("grand slam")) return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20"
  if (tier.toLowerCase().includes("masters 1000") || tier.toLowerCase().includes("masters series")) return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20"
  if (tier.toLowerCase().includes("atp 500") || tier.toLowerCase().includes("wta 500")) return "bg-primary/10 text-primary border-primary/20"
  if (tier.toLowerCase().includes("finals")) return "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20"
  return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20"
}

export function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  } catch {
    return dateStr
  }
}

export function formatDateShort(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" })
  } catch {
    return dateStr
  }
}

export function formatTime(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  } catch {
    return ""
  }
}

const ISO3_TO_ISO2: Record<string, string> = {
  AFG: "af", ALB: "al", DZA: "dz", AND: "ad", AGO: "ao", ARG: "ar", ARM: "am",
  AUS: "au", AUT: "at", AZE: "az", BHR: "bh", BGD: "bd", BLR: "by", BEL: "be",
  BLZ: "bz", BEN: "bj", BTN: "bt", BOL: "bo", BIH: "ba", BWA: "bw", BRA: "br",
  BRN: "bn", BGR: "bg", BFA: "bf", BDI: "bi", KHM: "kh", CMR: "cm", CAN: "ca",
  CPV: "cv", CAF: "cf", TCD: "td", CHL: "cl", CHN: "cn", COL: "co", COD: "cd",
  COG: "cg", CRI: "cr", CIV: "ci", HRV: "hr", CUB: "cu", CYP: "cy", CZE: "cz",
  DNK: "dk", DJI: "dj", DOM: "do", ECU: "ec", EGY: "eg", SLV: "sv", GNQ: "gq",
  ERI: "er", EST: "ee", ETH: "et", FJI: "fj", FIN: "fi", FRA: "fr", GAB: "ga",
  GMB: "gm", GEO: "ge", DEU: "de", GER: "de", GHA: "gh", GRC: "gr", GRE: "gr",
  GTM: "gt", GIN: "gn", GUY: "gy", HTI: "ht", HND: "hn", HUN: "hu", ISL: "is",
  IND: "in", IDN: "id", IRN: "ir", IRQ: "iq", IRL: "ie", ISR: "il", ITA: "it",
  JAM: "jm", JPN: "jp", JOR: "jo", KAZ: "kz", KEN: "ke", PRK: "kp", KOR: "kr",
  KWT: "kw", KGZ: "kg", LAO: "la", LVA: "lv", LBN: "lb", LSO: "ls", LBR: "lr",
  LBY: "ly", LIE: "li", LTU: "lt", LUX: "lu", MDG: "mg", MWI: "mw", MYS: "my",
  MDV: "mv", MLI: "ml", MLT: "mt", MRT: "mr", MUS: "mu", MEX: "mx", MDA: "md",
  MCO: "mc", MNG: "mn", MNE: "me", MAR: "ma", MOZ: "mz", MMR: "mm", NAM: "na",
  NPL: "np", NLD: "nl", NED: "nl", NZL: "nz", NIC: "ni", NER: "ne", NGA: "ng",
  MKD: "mk", NOR: "no", OMN: "om", PAK: "pk", PAN: "pa", PNG: "pg", PRY: "py",
  PER: "pe", PHL: "ph", POL: "pl", PRT: "pt", QAT: "qa", ROU: "ro", RUS: "ru",
  RWA: "rw", KSA: "sa", SAU: "sa", SEN: "sn", SRB: "rs", SLE: "sl", SGP: "sg",
  SVK: "sk", SVN: "si", SOM: "so", ZAF: "za", ESP: "es", LKA: "lk", SDN: "sd",
  SWE: "se", SUI: "ch", CHE: "ch", SYR: "sy", TWN: "tw", TPE: "tw", TJK: "tj",
  TZA: "tz", THA: "th", TGO: "tg", TTO: "tt", TUN: "tn", TUR: "tr", TKM: "tm",
  UGA: "ug", UKR: "ua", ARE: "ae", UAE: "ae", GBR: "gb", USA: "us", URY: "uy",
  UZB: "uz", VEN: "ve", VNM: "vn", YEM: "ye", ZMB: "zm", ZWE: "zw",
  BRZ: "br",
}

export function countryFlag(iso3: string): string {
  const iso2 = ISO3_TO_ISO2[iso3.toUpperCase()]
  if (!iso2) return ""
  return `https://flagcdn.com/24x18/${iso2}.png`
}

export function countryFlagLg(iso3: string): string {
  const iso2 = ISO3_TO_ISO2[iso3.toUpperCase()]
  if (!iso2) return ""
  return `https://flagcdn.com/32x24/${iso2}.png`
}

export function surfaceLabel(court: string): string {
  if (court === "I.hard") return "Indoor Hard"
  return court
}

export function winRate(wins: number, losses: number): number {
  const total = wins + losses
  if (total === 0) return 0
  return Math.round((wins / total) * 100)
}
