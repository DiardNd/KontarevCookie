import { useEffect, useState } from 'react'

const MOBILE_USER_AGENT =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

const isMobileDevice = (breakpoint: number): boolean => {
  if (typeof window === 'undefined') {
    return false
  }

  const byViewport = window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  const byUserAgent = MOBILE_USER_AGENT.test(navigator.userAgent)

  return byViewport || byUserAgent
}

export function useMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => isMobileDevice(breakpoint))

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const updateValue = () => {
      setIsMobile(isMobileDevice(breakpoint))
    }

    updateValue()
    mediaQuery.addEventListener('change', updateValue)
    window.addEventListener('resize', updateValue)

    return () => {
      mediaQuery.removeEventListener('change', updateValue)
      window.removeEventListener('resize', updateValue)
    }
  }, [breakpoint])

  return isMobile
}

