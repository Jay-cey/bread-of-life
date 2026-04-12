export const metadata = {
  title: 'Daily Bread | 60 Seconds With Jesus',
  description: "A verse, a reflection, a prayer. Under a minute, every morning.",
  openGraph: {
    images: [
      {
        url: 'https://breadoflife.vercel.app/api/og?title=Daily%20Bread&verse=60%20Seconds%20With%20Jesus&type=Daily',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://breadoflife.vercel.app/api/og?title=Daily%20Bread&verse=60%20Seconds%20With%20Jesus&type=Daily'],
  },
};

export default function DailyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
