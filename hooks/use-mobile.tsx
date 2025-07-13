// This hook determines whether the current screen width matches a mobile device width threshold
import * as React from "react" // Import all React utilities like useState and useEffect

const MOBILE_BREAKPOINT = 768 // Define the pixel width for mobile breakpoint (commonly 768px)

/**
 * useIsMobile
 * Custom React hook that returns true if the screen width is less than the mobile breakpoint.
 * It dynamically updates when the screen is resized across the threshold.
 */
export function useIsMobile() {
  // State to store whether the device is considered mobile (true/false)
  // Initially undefined to handle SSR (server-side rendering) cases gracefully
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  // Side effect to set up a media query listener when the component mounts
  React.useEffect(() => {
    // Create a MediaQueryList object that matches if the viewport is less than MOBILE_BREAKPOINT
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // Define a function to update the isMobile state when the viewport size changes
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Add event listener to the MediaQueryList to trigger onChange whenever the media query condition changes
    mql.addEventListener("change", onChange)

    // Set the initial state value based on the current window width
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    // Cleanup function to remove the event listener when the component unmounts
    return () => mql.removeEventListener("change", onChange)
  }, []) // Empty dependency array ensures this effect runs only once on mount

  // Return a boolean indicating if the device is mobile
  // The double negation (!!) ensures that the returned value is always a boolean
  return !!isMobile
}
