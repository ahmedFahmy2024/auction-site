import { useContext } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import Landing from '../components/Landing'
import Content from '../components/Content'
import Cooperating from '../components/Cooperating'

export default function Home() {
  const { locale, setLocale } = useContext(LocalContext);

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "home"].join(" ")}>
        <Landing />
        <Content />
        <Cooperating />
    </div>
  )
}
