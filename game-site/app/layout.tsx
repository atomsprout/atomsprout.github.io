import type { Metadata } from 'next';
import './globals.css';
import './game.css';
import './motion.css';
import './cosmic.css';

export const metadata: Metadata = {
  robots: {index:false, follow:true},
  metadataBase: new URL('https://atomsprout.com'),
  title: 'AtomSprout — From simple rules, infinite worlds.',
  description: 'An independent game studio creating infinite worlds from simple rules.',
  openGraph: {
    title: 'AtomSprout — From simple rules, infinite worlds.',
    description: 'An independent game studio creating infinite worlds from simple rules.',
    images: ['/games/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AtomSprout — From simple rules, infinite worlds.',
    description: 'An independent game studio creating infinite worlds from simple rules.',
    images: ['/games/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="cosmicEvents" aria-hidden="true">
          <div className="distantGalaxy galaxyOne"><i /><i /><i /></div>
          <div className="distantGalaxy galaxyTwo"><i /><i /></div>
          <span className="comet cometOne" />
          <span className="comet cometTwo" />
          <span className="comet cometThree" />
        </div>
        {children}
      </body>
    </html>
  );
}
