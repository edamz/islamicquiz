import "./globals.css";

export const metadata = {
  title: "Ramazan Quiz",
  description: "30-Day Automated Corporate Challenge",
};

export default function RootLayout({ children }) {
  return (
    // dir="rtl" instructs the browser to flip layouts, forms, and margins right-to-left
    // lang="dv" enforces correct language rendering constraints for Maldivian text strings
    <html lang="dv" dir="rtl" className="bg-slate-50 text-slate-900">
      <head>
        <style>{`
          body {
            font-family: 'Faruma', 'MV Boli', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          /* Custom utility to fix Dhivehi text flow boundaries and direction */
          .thaana-text {
            direction: rtl;
            unicode-bidi: isolate;
          }
        `}</style>
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
