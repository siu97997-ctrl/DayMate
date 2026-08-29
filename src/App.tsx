import './App.css'
import { useState } from 'react'
import { MateCollection } from './components/MateCollection'
import { TodayMate } from './components/TodayMate'

type Page = 'today' | 'collection'

function App() {
  const [page, setPage] = useState<Page>('today')
  const previewMode = new URLSearchParams(window.location.search).get('preview') === '1'

  return page === 'today' ? (
    <TodayMate onOpenCollection={() => setPage('collection')} />
  ) : (
    <MateCollection previewMode={previewMode} onBack={() => setPage('today')} />
  )
}

export default App
