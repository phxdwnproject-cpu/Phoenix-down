import React from 'react';

// Home page for Phoenix Down — includes the CTAs and the affiliate "The Item Shop" link
export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Welcome to Phoenix Down</h1>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">Discover guided journeys, premium content, and community hubs to level up your experience.</p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="#" className="px-6 py-3 rounded-lg font-bold text-[#001f44] bg-[#f7f450] shadow-md border-2 border-[rgba(0,41,85,0.06)]">Start Free Journey</a>
        <a href="#" className="px-6 py-3 rounded-lg font-bold text-white bg-[#fd5c25] shadow-md border-2 border-[rgba(212,175,55,0.06)]">Premium Experience</a>
      </div>

      {/* Item Shop affiliate link placed underneath the two CTAs */}
      <div className="mt-4">
        <a
          href="https://itemshop.life"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 px-6 py-3 rounded-lg font-bold shadow-lg"
          style={{
            background: 'linear-gradient(180deg, #002955 0%, #001f44 100%)',
            color: '#d4af37',
            border: '2px solid rgba(212,175,55,0.12)'
          }}
          onClick={() => {
            // non-blocking tracking beacon to the site's tracking endpoint (optional)
            try {
              if (navigator && navigator.sendBeacon) {
                navigator.sendBeacon('/api/track-click', JSON.stringify({ source: 'item-shop-link', page: window.location.pathname }));
              }
            } catch (e) {
              // swallow errors — don't block navigation
            }
          }}
        >
          The Item Shop
        </a>
      </div>
    </div>
  );
}
