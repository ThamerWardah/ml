import './globals.css'
import ToasterContext from './context/ToasterContext';

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className='bg-white' >
        <ToasterContext/>
        
        {children}
        
        </body>
    </html>
  )
}
