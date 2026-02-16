import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Local area calibration",
  description: "Calibration diagnostics for UK local area microsimulation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="banner">
          <h1>Local area calibration</h1>
        </div>
        {children}
      </body>
    </html>
  );
}
