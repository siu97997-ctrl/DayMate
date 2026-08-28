import './App.css'
import { useState } from 'react'
import { MateCollection } from './components/MateCollection'
import { TodayMate } from './components/TodayMate'

type Page = 'today' | 'collection'

function App() {
  const [page, setPage] = useState<Page>('today')

  return page === 'today' ? (
    <TodayMate onOpenCollection={() => setPage('collection')} />
  ) : (
    <MateCollection onBack={() => setPage('today')} />
  )
}

export default App
