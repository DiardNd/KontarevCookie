import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'

type DocumentItem = {
  id: string
  title: string
  description: string
  path: string
  fileName: string
}

const documents: DocumentItem[] = [
  {
    id: 'menu',
    title: 'Меню кексов',
    description: 'Актуальные вкусы и цены на заказ.',
    path: '/documents/menu-cupcakes.txt',
    fileName: 'menu-cupcakes.txt',
  },
  {
    id: 'price-list',
    title: 'Прайс для мероприятий',
    description: 'Пакеты для дней рождения, свадеб и корпоративов.',
    path: '/documents/event-price-list.txt',
    fileName: 'event-price-list.txt',
  },
  {
    id: 'care',
    title: 'Памятка по хранению',
    description: 'Как перевозить и хранить кексы, чтобы они оставались свежими.',
    path: '/documents/cupcake-care-guide.txt',
    fileName: 'cupcake-care-guide.txt',
  },
]

function App() {
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async (documentItem: DocumentItem) => {
    try {
      setLoadingId(documentItem.id)
      setError(null)

      const response = await fetch(documentItem.path)
      if (!response.ok) {
        throw new Error(`Не удалось загрузить файл: ${response.status}`)
      }

      const fileBlob = await response.blob()
      const objectUrl = URL.createObjectURL(fileBlob)
      const anchor = document.createElement('a')
      anchor.href = objectUrl
      anchor.download = documentItem.fileName
      document.body.append(anchor)
      anchor.click()
      anchor.remove()
      URL.revokeObjectURL(objectUrl)
    } catch {
      setError('Ошибка загрузки. Проверьте, что файл существует в папке public/documents.')
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <>
      <Header />

      <main className="landing">
        <section id="home" className="hero">
          <p className="eyebrow">Kontarev Cookie</p>
          <h1>Домашние кексы для любого события</h1>
          <p className="lead">
            Нежные кексы ручной работы: от классической ванили до насыщенного шоколада.
            Скачайте документы ниже, чтобы быстро выбрать подходящий вариант.
          </p>
        </section>

        <section id="products">
          <h2 className="section-title">Продукция</h2>
          <div className="documents">
            {documents.map((documentItem) => (
              <article key={documentItem.id} className="document-card">
                <h3>{documentItem.title}</h3>
                <p>{documentItem.description}</p>
                <button
                  type="button"
                  onClick={() => handleDownload(documentItem)}
                  disabled={loadingId === documentItem.id}
                >
                  {loadingId === documentItem.id ? 'Загрузка...' : 'Скачать документ'}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="about">
          <h2 className="section-title">О нас</h2>
          <p>
            Мы готовим кексы небольшими партиями, используем натуральные ингредиенты и
            помогаем собрать набор под любой формат события.
          </p>
        </section>

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
      </main>
      <Footer />
    </>
  )
}

export default App
