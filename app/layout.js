import './globals.css'
import ToasterContext from './context/ToasterContext';
import SessionContext from './context/SessionContext'

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className='bg-gray-100 h-full' >
        <SessionContext >
        <ToasterContext/>
        {children}
        </SessionContext>
        
        </body>
    </html>
  )
}
