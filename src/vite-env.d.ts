/// <reference types="vite/client" />

interface Window {
  gtag?: (
    command: "event",
    name: string,
    params: { value?: number; event_label?: string; non_interaction?: boolean },
  ) => void;
}
