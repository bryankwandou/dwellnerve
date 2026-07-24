import type {Metadata} from "next"; import "./globals.css";
export const metadata:Metadata={title:"DwellNerve — Rental operations early warning",description:"Repairs, rent, and lease risk closed in one auditable operating loop."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}