import './globals.css';
import 'katex/dist/katex.min.css'; 

export const metadata = {
  title: 'Quantophobia Remediation',
  description: 'Gradually improve your quantitative aptitude.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans antialiased">
        <main className="max-w-3xl mx-auto py-10 px-4">
          {children}
        </main>
      </body>
    </html>
  );
}