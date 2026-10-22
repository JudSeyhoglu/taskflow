'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        alert('Sunucu yanıtında bir hata oluştu.');
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Ödeme başlatılırken bir hata oluştu.');
      }
    } catch (err) {
      console.error(err);
      alert('Sunucu ile bağlantı kurulamadı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between font-sans">
      {/* Navbar */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold text-blue-600 tracking-tight">SaaSApp</span>
          </div>

          <nav className="hidden md:flex space-x-8 text-gray-600 font-medium">
            <a href="#features" className="hover:text-blue-600 transition">Özellikler</a>
            <a href="#pricing" className="hover:text-blue-600 transition">Fiyatlandırma</a>
            <a href="#about" className="hover:text-blue-600 transition">Hakkımızda</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Giriş Yap
            </Link>
            <Link 
              href="/signup" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
            >
              Kayıt Ol
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-blue-50 to-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            İşinizi Büyütmenin En Akıllı ve Hızlı Yolu
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Tüm süreçlerinizi tek bir platformdan yönetin, zaman kazanın ve verimliliğinizi anında artırın.
          </p>
          <a
            href="#pricing"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
          >
            Hemen Başlayın
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Neden Bizi Tercih Etmelisiniz?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Hızlı ve Güvenli</h3>
              <p className="text-gray-600">En son teknolojiler ile altyapınızı yıldırım hızında ve tam güvenlikle çalıştırın.</p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Detaylı Analizler</h3>
              <p className="text-gray-600">Verilerinizi anlık olarak takip edin ve işiniz için en doğru kararları alın.</p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">7/24 Destek</h3>
              <p className="text-gray-600">Uzman ekibimiz her ihtiyacınız olduğunda yanınızda yer alır.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Uygun Fiyatlandırma Planları</h2>
          <p className="text-gray-600 mb-12">Gizli ücret yok. İhtiyacınıza uygun planı seçin.</p>

          <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
            
            {/* Free Plan */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col justify-between text-center relative">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mt-2">Ücretsiz Plan</h3>
                <p className="text-gray-500 mt-2">Temel özellikleri keşfetmek için ideal.</p>
                
                <div className="my-6">
                  <span className="text-5xl font-extrabold text-gray-900">0 TL</span>
                  <span className="text-gray-500 font-medium"> / sonsuza kadar</span>
                </div>

                <ul className="text-left space-y-3 mb-8 text-gray-600 border-t pt-6">
                  <li className="flex items-center">✓ Temel erişim hakları</li>
                  <li className="flex items-center">✓ Standart analiz araçları</li>
                  <li className="flex items-center">✓ E-posta ile destek</li>
                  <li className="flex items-center text-gray-400">✕ Öncelikli 7/24 destek</li>
                </ul>
              </div>

              <Link
                href="/signup"
                className="w-full bg-gray-100 text-gray-800 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition shadow-sm block text-center"
              >
                Ücretsiz Başla
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-blue-600 flex flex-col justify-between text-center relative overflow-hidden">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider absolute top-4 right-4">
                En Popüler
              </span>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mt-2">Premium Plan</h3>
                <p className="text-gray-500 mt-2">Tüm gelişmiş özelliklere tam erişim sağlayın.</p>
                
                <div className="my-6">
                  <span className="text-5xl font-extrabold text-gray-900">199 TL</span>
                  <span className="text-gray-500 font-medium"> / ay</span>
                </div>

                <ul className="text-left space-y-3 mb-8 text-gray-600 border-t pt-6">
                  <li className="flex items-center">✓ Sınırsız erişim</li>
                  <li className="flex items-center">✓ Gelişmiş analiz araçları</li>
                  <li className="flex items-center">✓ 7/24 Öncelikli destek</li>
                  <li className="flex items-center">✓ Anında kurulum</li>
                </ul>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition disabled:opacity-50 shadow-md"
              >
                {loading ? 'Yönlendiriliyorsunuz...' : "Premium'a Yükselt"}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8 px-6 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div>
            &copy; 2026 SaaSApp. Tüm hakları saklıdır.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-700">Gizlilik Politikası</a>
            <a href="#" className="hover:text-gray-700">Kullanım Şartları</a>
            <a href="#" className="hover:text-gray-700">İletişim</a>
          </div>
        </div>
      </footer>
    </div>
  );
}