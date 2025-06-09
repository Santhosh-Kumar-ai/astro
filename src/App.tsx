import React, { useState } from 'react';
import FormPage from './components/FormPage';
import CartPage from './components/CartPage';
import SuccessPage from './components/SuccessPage';
import FailurePage from './components/FailurePage';
import Header from './components/Header';
import CosmicBackground from './components/CosmicBackground';

type Page = 'form' | 'cart' | 'success' | 'failure';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('form');

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'form':
        return <FormPage onNext={() => navigateToPage('cart')} />;
      case 'cart':
        return <CartPage onBack={() => navigateToPage('form')} onSuccess={() => navigateToPage('success')} onFailure={() => navigateToPage('failure')} />;
      case 'success':
        return <SuccessPage onNewOrder={() => navigateToPage('form')} />;
      case 'failure':
        return <FailurePage onRetry={() => navigateToPage('cart')} onNewOrder={() => navigateToPage('form')} />;
      case 'failure':
        return <FailurePage onRetry={() => navigateToPage('cart')} onNewOrder={() => navigateToPage('form')} />;
      default:
        return <FormPage onNext={() => navigateToPage('cart')} />;
    }
  };

  return (
    <div className="min-h-screen cosmic-bg relative overflow-hidden">
      <CosmicBackground />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-8">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
}

export default App;