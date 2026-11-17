// How each sign-in provider looks. The class strings are spelled out in full
// so Tailwind finds them when it scans the source.
export interface ProviderStyle {
  icon: string;
  button: string;
  border: string;
  text: string;
}

const styles: Record<string, ProviderStyle> = {
  line: {
    icon: "fa-brands fa-line",
    button: "border-line text-line hover:bg-line",
    border: "border-line/60",
    text: "text-line",
  },
  google: {
    icon: "fa-brands fa-google",
    button: "border-google text-google hover:bg-google",
    border: "border-google/60",
    text: "text-google",
  },
  microsoft: {
    icon: "fa-brands fa-microsoft",
    button: "border-microsoft text-microsoft hover:bg-microsoft",
    border: "border-microsoft/60",
    text: "text-microsoft",
  },
  github: {
    icon: "fa-brands fa-github",
    button: "border-github text-github hover:bg-github",
    border: "border-github/60",
    text: "text-github",
  },
};

const fallback: ProviderStyle = {
  icon: "fa-solid fa-key",
  button: "border-slate-600 text-slate-600 hover:bg-slate-600",
  border: "border-slate-600/60",
  text: "text-slate-600",
};

// The order buttons appear in, most used first. Unknown providers go last.
const order = ["line", "google", "microsoft", "github"];

export function providerStyle(provider: string): ProviderStyle {
  return styles[provider] ?? fallback;
}

export function sortProviders(providers: readonly string[]): string[] {
  const rank = (p: string) => {
    const i = order.indexOf(p);
    return i === -1 ? order.length : i;
  };
  return [...providers].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
}
