/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "precache.EqRHdLcT37w4y8nHviCs2.95a7da0a7f09571f06b5f721c3cd585e.js"
);

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "public/animate.css",
    "revision": "8eae1a9cfafdc593321d4d59ec4905ea"
  },
  {
    "url": "public/favicon.ico",
    "revision": "21b739d43fcb9bbb83d8541fe4fe88fa"
  },
  {
    "url": "public/icons/icon-128x128.png",
    "revision": "27851f16c1021a1342761f0a0a009a4e"
  },
  {
    "url": "public/icons/icon-144x144.png",
    "revision": "2218c7f1a7a06cb7e4ca0a2d3a3a399f"
  },
  {
    "url": "public/icons/icon-152x152.png",
    "revision": "59e5919047bfb5e2fb1c92e302d34075"
  },
  {
    "url": "public/icons/icon-192x192.png",
    "revision": "e21753d0a201ae7eb7950df266ad5686"
  },
  {
    "url": "public/icons/icon-384x384.png",
    "revision": "302040135fa788cca68e5d51bac17881"
  },
  {
    "url": "public/icons/icon-512x512.png",
    "revision": "ced23a5028dd17441b5caef76779ae65"
  },
  {
    "url": "public/icons/icon-72x72.png",
    "revision": "a93a41e8be74c861b467f51ac451437e"
  },
  {
    "url": "public/icons/icon-96x96.png",
    "revision": "1f69763e26b8fa4cf1bc41c6bf26a214"
  },
  {
    "url": "public/images/abstract.png",
    "revision": "6f1ff0f0e35b114cb2470bbe6278c1e7"
  },
  {
    "url": "public/images/book-chapter-seven.jpg",
    "revision": "eb85dbeab773d138f9f9c3907528ed88"
  },
  {
    "url": "public/images/book-chapter-six.jpg",
    "revision": "5991b9de2876524471d81cb2296d2cdb"
  },
  {
    "url": "public/images/book-lamp.jpg",
    "revision": "0378544f34e63030fe266f4e3390d14b"
  },
  {
    "url": "public/images/book-page.jpg",
    "revision": "0a2699877a56cb598884757decd7dc92"
  },
  {
    "url": "public/images/books-collections.jpg",
    "revision": "3b64b015d0f9fc79641a0db9517bb463"
  },
  {
    "url": "public/images/books-stack.jpg",
    "revision": "9452d4eb1638ebf97cbaec18245ef165"
  },
  {
    "url": "public/images/books.svg",
    "revision": "ca3c37487101ade3fc819fca22269025"
  },
  {
    "url": "public/images/close-up-of-paper.jpg",
    "revision": "528a1b1dd2f63f7d835c7a9c6fbe1116"
  },
  {
    "url": "public/images/closeup.jpg",
    "revision": "5db57a0b0615b2bfe8e6bd98d08d6178"
  },
  {
    "url": "public/images/dashboard.png",
    "revision": "82d5ba8167e4a77a7a696e2a5471ffa1"
  },
  {
    "url": "public/images/icon-bg.png",
    "revision": "edbfd96615a07aad100d9eba45fac3ff"
  },
  {
    "url": "public/images/library.jpg",
    "revision": "460ca8e5c5e5cfea6ed55a26d16f1bb5"
  },
  {
    "url": "public/images/logo.png",
    "revision": "4a845932b2bce4a5e26cdf12282f37a8"
  },
  {
    "url": "public/images/man_reading.jpg",
    "revision": "c132f9241a6234e80dcfdc4e6b23ae62"
  },
  {
    "url": "public/images/man-reading-book.jpg",
    "revision": "8defa98ba81ddd4dcecf9080a828e1f5"
  },
  {
    "url": "public/images/mello.svg",
    "revision": "5125951940ed274999a01e2180f3928c"
  },
  {
    "url": "public/images/nature.png",
    "revision": "a43b2aafc3a3e01013e2bee50cbd6dc0"
  },
  {
    "url": "public/images/nature.svg",
    "revision": "1cbffd489d6da107c5169b1474bd9952"
  },
  {
    "url": "public/images/no-image-available.png",
    "revision": "707313a1e614ba55cdc81b416cf6eaa7"
  },
  {
    "url": "public/images/no-image.png",
    "revision": "104a1a91ed03ecbac6e5ce17e130cf15"
  },
  {
    "url": "public/images/pile_books.jpg",
    "revision": "b3429523b1c3f5186394857aac6cf2c0"
  },
  {
    "url": "public/images/pile.jpg",
    "revision": "b17e5db04ed8f6d98786d35ddf11a982"
  },
  {
    "url": "public/images/piled-books.jpg",
    "revision": "8686fd0c59e661b5047818fb2fd2d8a1"
  },
  {
    "url": "public/images/profile-image.jpg",
    "revision": "4c27cd04fb50ae60ec0a95edd66103a5"
  },
  {
    "url": "public/images/rslibrary-logo.jpg",
    "revision": "75d772235aacc4f186fe0354a149a17f"
  },
  {
    "url": "public/images/rslibrary-logo.png",
    "revision": "efc7f0baf057c49211d6246d510a6104"
  },
  {
    "url": "public/images/rslibrary-logo.svg",
    "revision": "5cf9a62abdf492e9b774c09267b9cf1f"
  },
  {
    "url": "public/images/sofa.jpg",
    "revision": "998ab4ca6ef9cfb8e0b772e6fa82557f"
  },
  {
    "url": "public/images/stack-of-magazines.jpg",
    "revision": "27d4d138cf4d88a049f6f413657be9d3"
  },
  {
    "url": "public/images/take-the-risk.jpg",
    "revision": "56b019af334acbc45fa8a323e792afa5"
  },
  {
    "url": "public/images/teacup.jpg",
    "revision": "e3190a977db135cf039aee2d3d497dd7"
  },
  {
    "url": "public/images/the-polaroid-book.jpg",
    "revision": "80c91acfc40e0a77e79d35d5f1a17569"
  },
  {
    "url": "public/images/waiting.svg",
    "revision": "e6fa9b4e61380197818a95e9eaa4a400"
  },
  {
    "url": "public/images/wall.jpg",
    "revision": "01980763ec93db5255d87cbd9266f19d"
  },
  {
    "url": "public/manifest.json",
    "revision": "4a1d26aee5fe5bf48db4588533ea5313"
  },
  {
    "url": "public/nprogress.css",
    "revision": "1134a7e741ba4a46ffa5b2c48da15cf3"
  },
  {
    "url": "public/uploads/avatars/idowu-1574695240871.jpeg",
    "revision": "65da12fe13afcaac9ec18493fcbb90ee"
  },
  {
    "url": "public/uploads/avatars/John Doe-1574676216360.jpeg",
    "revision": "bc7f85daf5cbb449f86694807bb7f3a6"
  },
  {
    "url": "public/uploads/avatars/john-1574678340865.jpeg",
    "revision": "bc7f85daf5cbb449f86694807bb7f3a6"
  },
  {
    "url": "public/uploads/avatars/john-1574678430899.jpeg",
    "revision": "bc7f85daf5cbb449f86694807bb7f3a6"
  },
  {
    "url": "public/uploads/avatars/john-1574703278927.jpeg",
    "revision": "bc7f85daf5cbb449f86694807bb7f3a6"
  },
  {
    "url": "public/uploads/avatars/john-1574704813498.jpeg",
    "revision": "d06fe53739e19cf91bc8a0debaa06bb4"
  },
  {
    "url": "public/uploads/avatars/john-1574704895761.jpeg",
    "revision": "5371388e755ed78917cfc104314dd1a8"
  },
  {
    "url": "public/uploads/avatars/john-1574715663342.jpeg",
    "revision": "d06fe53739e19cf91bc8a0debaa06bb4"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i, new workbox.strategies.CacheFirst({ "cacheName":"google-fonts", plugins: [new workbox.expiration.Plugin({ maxEntries: 4, maxAgeSeconds: 31536000, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/use\.fontawesome\.com\/releases\/.*/i, new workbox.strategies.CacheFirst({ "cacheName":"font-awesome", plugins: [new workbox.expiration.Plugin({ maxEntries: 1, maxAgeSeconds: 31536000, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"static-font-assets", plugins: [new workbox.expiration.Plugin({ maxEntries: 4, maxAgeSeconds: 604800, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"static-image-assets", plugins: [new workbox.expiration.Plugin({ maxEntries: 64, maxAgeSeconds: 86400, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/\.(?:js)$/i, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"static-js-assets", plugins: [new workbox.expiration.Plugin({ maxEntries: 16, maxAgeSeconds: 86400, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/\.(?:css|less)$/i, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"static-style-assets", plugins: [new workbox.expiration.Plugin({ maxEntries: 16, maxAgeSeconds: 86400, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/.*/i, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"others", plugins: [new workbox.expiration.Plugin({ maxEntries: 16, maxAgeSeconds: 86400, purgeOnQuotaError: false })] }), 'GET');
