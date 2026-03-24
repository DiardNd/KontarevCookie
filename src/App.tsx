import { useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';

type DocumentItem = {
  id: string;
  title: string;
  description: string;
  archivePath: string;
  fileName: string;
};

const documents: DocumentItem[] = [
  {
    id: 'candies',
    title: 'Конфеты',
    description: 'Нежные, тягучие и очень опасные для самоконтроля.',
    archivePath: '/KontarevCookie/archives/candies.zip',
    fileName: 'candies.zip'
  },
  {
    id: 'glazing',
    title: 'Глазировка',
    description: 'Хрустящая сладкая корочка, от которой сложно оторваться.',
    archivePath: '/archives/glazing.zip',
    fileName: 'glazing.zip'
  },
  {
    id: 'cakes-pies-rolls',
    title: 'Пирожные, пироги, рулеты',
    description: 'Мягкое тесто, сочная начинка и тот самый домашний вкус.',
    archivePath: '/archives/cakes-pies-rolls.zip',
    fileName: 'cakes-pies-rolls.zip'
  },
  {
    id: 'gingerbread',
    title: 'Пряники',
    description: 'Аромат специй и уют в каждом укусе.',
    archivePath: '/archives/gingerbread.zip',
    fileName: 'gingerbread.zip'
  },
  {
    id: 'sugar-cookies',
    title: 'Сахарное печенье',
    description: 'Легкий хруст, сливочная сладость и идеальная пара к чаю.',
    archivePath: '/archives/sugar-cookies.zip',
    fileName: 'sugar-cookies.zip'
  },
  {
    id: 'sweet-pastry',
    title: 'Сдобное',
    description: 'Пышное, румяное и только из печи.',
    archivePath: '/archives/sweet-pastry.zip',
    fileName: 'sweet-pastry.zip'
  },
  {
    id: 'puff-pastry',
    title: 'Слойка',
    description: 'Воздушные слои и аппетитный хруст с первого укуса.',
    archivePath: '/archives/puff-pastry.zip',
    fileName: 'puff-pastry.zip'
  },
  {
    id: 'sandwiches',
    title: 'Сэндвич',
    description: 'Сытный перекус, который хочется повторить еще раз.',
    archivePath: '/archives/sandwiches.zip',
    fileName: 'sandwiches.zip'
  }
];

function App() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async (documentItem: DocumentItem) => {
    try {
      setLoadingId(documentItem.id);
      setError(null);

      const response = await fetch(documentItem.archivePath);
      if (!response.ok) {
        throw new Error(`Не удалось загрузить файл: ${response.status}`);
      }

      const fileBlob = await response.blob();
      const objectUrl = URL.createObjectURL(fileBlob);
      const anchor = document.createElement('a');
      anchor.href = objectUrl;
      anchor.download = documentItem.fileName;
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      setError('Ошибка загрузки. Проверьте, что архивы есть в папке public/archives.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <Header />

      <main className="landing">
        <section id="home" className="hero">
          <p className="eyebrow">Kontarev Cookie</p>
          <h1>Домашние кексы для любого события</h1>
          <p className="lead">
            Нежные кексы ручной работы: от классической ванили до насыщенного шоколада.
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
                  disabled={loadingId === documentItem.id}>
                  {loadingId === documentItem.id ? 'Загрузка...' : 'Скачать архив'}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="about">
          <h2 className="section-title">О нас</h2>
          <p>
            Мы готовим кексы небольшими партиями, используем натуральные ингредиенты и помогаем
            собрать набор под любой формат события.
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
  );
}

export default App;
