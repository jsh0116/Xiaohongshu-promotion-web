import dynamic from "next/dynamic";
import type { PropsWithChildren } from "react";

const GoogleAnalytics = dynamic(() =>
  import("@next/third-parties/google").then((mod) => ({
    default: mod.GoogleAnalytics,
  })),
);

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
  const gaId = process.env.GA_MEASUREMENT_ID;

  return (
    <>
      {children}
      {!!gaId && <GoogleAnalytics gaId={gaId} />}
    </>
  );
}
