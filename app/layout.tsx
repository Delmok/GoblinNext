import '../styles/globals.css'
import  Navbar from './components/navbar';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html>
            <head />
            
            <body className='bg-gray-900'>
                <Navbar></Navbar>
                {children}
            </body>
        </html>
)
}
