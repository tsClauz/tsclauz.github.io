import '../css/global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta name="darkreader-lock" />
      </head>

      <body>
        <div id="root">{children}</div>
      </body>

    </html>
  )
}