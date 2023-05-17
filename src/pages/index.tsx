import HomePage from './HomePage'
import { Montserrat } from '@next/font/google'

const montserrat = Montserrat(
  {
    subsets: [ 'latin' ],
    weight: [ '400', '700' ],
    variable: "--font-montserrat"
  }
)

export const metadata = {
  title: 'User-List',
  description: 'Generated by create next app',
}

export default function Home() {
  return (
    <main>
      <HomePage/>
    </main>
  )
}
