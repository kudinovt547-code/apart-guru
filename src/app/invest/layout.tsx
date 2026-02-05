import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Инвестировать | Apart Guru",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InvestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
