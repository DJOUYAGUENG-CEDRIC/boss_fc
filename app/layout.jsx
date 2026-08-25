import './globals.css';

export const metadata = {
  title: 'Boos FC',
  description: 'Assistant pronostics sportifs — Code promo 47LDC',
  icons: { icon: '/valverde.jpeg' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
