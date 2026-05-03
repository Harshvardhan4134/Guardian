import React from 'react'
import { Users } from 'lucide-react'
import type { PlatformBrandId } from '../../types/platformBrand'

export type { PlatformBrandId } from '../../types/platformBrand'

interface SocialPlatformLogoProps {
  brand: PlatformBrandId
  className?: string
}

/**
 * Renders official-style brand marks from `/public/brands/*.svg`.
 */
const SocialPlatformLogo = ({ brand, className = 'h-8 w-8' }: SocialPlatformLogoProps) => {
  if (brand === 'discord_slack') {
    return (
      <div className={`flex items-center gap-0.5 shrink-0 ${className}`} aria-hidden>
        <img src="/brands/discord.svg" alt="" className="h-8 w-8 object-contain" />
        <img src="/brands/slack.svg" alt="" className="h-8 w-8 object-contain" />
      </div>
    )
  }

  if (brand === 'community') {
    return <Users className={`${className} text-primary shrink-0`} strokeWidth={1.75} aria-hidden />
  }

  return <img src={`/brands/${brand}.svg`} alt="" className={`${className} object-contain shrink-0`} aria-hidden />
}

export default SocialPlatformLogo
