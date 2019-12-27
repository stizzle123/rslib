self.__precacheManifest = [
  {
    url: "/_next/static/GtYnK1GUs9otrP7nrfoMs/pages/_app.js",
    revision: "58e33a9090af87c769a9"
  },
  {
    url: "/_next/static/GtYnK1GUs9otrP7nrfoMs/pages/_error.js",
    revision: "3f4d6ff9683741fe78b2"
  },
  {
    url: "/_next/static/GtYnK1GUs9otrP7nrfoMs/pages/account.js",
    revision: "b6f2c32106f0b41055a0"
  },
  {
    url: "/_next/static/GtYnK1GUs9otrP7nrfoMs/pages/book/edit.js",
    revision: "47af1d10cf78c520d102"
  },
  {
    url: "/_next/static/GtYnK1GUs9otrP7nrfoMs/pages/book/info.js",
    revision: "e82f1868fe89b42d7306"
  },
  {
    url: "/_next/static/GtYnK1GUs9otrP7nrfoMs/pages/bookcollections.js",
    revision: "a94a93859950df6fe872"
  },
  {
    url: "/_next/static/GtYnK1GUs9otrP7nrfoMs/pages/books.js",
    revision: "25e4ca1920acd11b6291"
  },
  {
    url: "/_next/static/GtYnK1GUs9otrP7nrfoMs/pages/books/add.js",
    revision: "a332abfe36322a20e509"
  },
  {
    url: "/_next/static/GtYnK1GUs9otrP7nrfoMs/pages/collection.js",
    revision: "75cb5ebf58203f39a9bb"
  },
  {
    url: "/_next/static/GtYnK1GUs9otrP7nrfoMs/pages/create.js",
    revision: "a41286a736344d5f89f7"
  },
  {
    url: "/_next/static/GtYnK1GUs9otrP7nrfoMs/pages/dashboard.js",
    revision: "18bca456858cfac6d658"
  },
  {
    url: "/_next/static/GtYnK1GUs9otrP7nrfoMs/pages/forgotpassword.js",
    revision: "a6c6819af922bcda701b"
  },
  {
    url: "/_next/static/GtYnK1GUs9otrP7nrfoMs/pages/index.js",
    revision: "2a6a4a60dca9b4cce4ea"
  },
  {
    url: "/_next/static/GtYnK1GUs9otrP7nrfoMs/pages/log.js",
    revision: "430ab03de42a10ad95b3"
  },
  {
    url: "/_next/static/GtYnK1GUs9otrP7nrfoMs/pages/login.js",
    revision: "7391ab73fdbd26808d05"
  },
  {
    url: "/_next/static/GtYnK1GUs9otrP7nrfoMs/pages/permissions.js",
    revision: "4512d8aa258eaeddec0c"
  },
  {
    url: "/_next/static/GtYnK1GUs9otrP7nrfoMs/pages/privacy.js",
    revision: "cea4df84772b7b0fa229"
  },
  {
    url: "/_next/static/GtYnK1GUs9otrP7nrfoMs/pages/profile.js",
    revision: "fcb6ffd8770822159697"
  },
  {
    url: "/_next/static/GtYnK1GUs9otrP7nrfoMs/pages/requests.js",
    revision: "d6479ba8654d0fa2632f"
  },
  {
    url: "/_next/static/GtYnK1GUs9otrP7nrfoMs/pages/signup.js",
    revision: "a1d5e552750ae69aafb5"
  },
  {
    url: "/_next/static/GtYnK1GUs9otrP7nrfoMs/pages/users.js",
    revision: "af447dc0a3efe1aa10c1"
  },
  {
    url: "/_next/static/chunks/commons.6445ce48f61b5869943a.js",
    revision: "6e81279ff3daf635a2c9"
  },
  {
    url: "/_next/static/runtime/main-791c875a85555f287169.js",
    revision: "0daea49358f689f7b8eb"
  },
  {
    url: "/_next/static/runtime/polyfills-5cc6e85e193ac9a8e903.js",
    revision: "b5ae5ec65a4297753caa"
  },
  {
    url: "/_next/static/runtime/webpack-08f7b238829422e3b9b2.js",
    revision: "fc489b339eb65f8713fe"
  }
];

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

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

importScripts();

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    url: "public/animate.css",
    revision: "8eae1a9cfafdc593321d4d59ec4905ea"
  },
  {
    url: "public/favicon.ico",
    revision: "21b739d43fcb9bbb83d8541fe4fe88fa"
  },
  {
    url: "public/icons/icon-128x128.png",
    revision: "7aa14b439cdbb4643515f871b8c1d187"
  },
  {
    url: "public/icons/icon-144x144.png",
    revision: "fdc38fa5ee251b9295d970986fd910d6"
  },
  {
    url: "public/icons/icon-152x152.png",
    revision: "4da775292451ac926cddb7200c39c200"
  },
  {
    url: "public/icons/icon-192x192.png",
    revision: "0dce286f34bf06dc56349806cf610662"
  },
  {
    url: "public/icons/icon-384x384.png",
    revision: "b7d625e37e297cbab6ea25f74432918d"
  },
  {
    url: "public/icons/icon-512x512.png",
    revision: "e771c3c6a94a19942b853b4646aa5bd1"
  },
  {
    url: "public/icons/icon-72x72.png",
    revision: "f2c7d15530be7249fe2ac4b3284616f7"
  },
  {
    url: "public/icons/icon-96x96.png",
    revision: "86e8e5e8e8d7ded26d676ad801038534"
  },
  {
    url: "public/images/abstract.png",
    revision: "6f1ff0f0e35b114cb2470bbe6278c1e7"
  },
  {
    url: "public/images/book-chapter-seven.jpg",
    revision: "eb85dbeab773d138f9f9c3907528ed88"
  },
  {
    url: "public/images/book-chapter-six.jpg",
    revision: "5991b9de2876524471d81cb2296d2cdb"
  },
  {
    url: "public/images/book-lamp.jpg",
    revision: "0378544f34e63030fe266f4e3390d14b"
  },
  {
    url: "public/images/book-page.jpg",
    revision: "0a2699877a56cb598884757decd7dc92"
  },
  {
    url: "public/images/books-collections.jpg",
    revision: "3b64b015d0f9fc79641a0db9517bb463"
  },
  {
    url: "public/images/books-stack.jpg",
    revision: "9452d4eb1638ebf97cbaec18245ef165"
  },
  {
    url: "public/images/books.svg",
    revision: "ca3c37487101ade3fc819fca22269025"
  },
  {
    url: "public/images/close-up-of-paper.jpg",
    revision: "528a1b1dd2f63f7d835c7a9c6fbe1116"
  },
  {
    url: "public/images/closeup.jpg",
    revision: "5db57a0b0615b2bfe8e6bd98d08d6178"
  },
  {
    url: "public/images/dashboard.png",
    revision: "82d5ba8167e4a77a7a696e2a5471ffa1"
  },
  {
    url: "public/images/icon-bg.png",
    revision: "edbfd96615a07aad100d9eba45fac3ff"
  },
  {
    url: "public/images/library.jpg",
    revision: "460ca8e5c5e5cfea6ed55a26d16f1bb5"
  },
  {
    url: "public/images/logo.png",
    revision: "4a845932b2bce4a5e26cdf12282f37a8"
  },
  {
    url: "public/images/man_reading.jpg",
    revision: "c132f9241a6234e80dcfdc4e6b23ae62"
  },
  {
    url: "public/images/man-reading-book.jpg",
    revision: "8defa98ba81ddd4dcecf9080a828e1f5"
  },
  {
    url: "public/images/mello.svg",
    revision: "5125951940ed274999a01e2180f3928c"
  },
  {
    url: "public/images/nature.png",
    revision: "a43b2aafc3a3e01013e2bee50cbd6dc0"
  },
  {
    url: "public/images/nature.svg",
    revision: "1cbffd489d6da107c5169b1474bd9952"
  },
  {
    url: "public/images/no-image-available.png",
    revision: "707313a1e614ba55cdc81b416cf6eaa7"
  },
  {
    url: "public/images/no-image.png",
    revision: "104a1a91ed03ecbac6e5ce17e130cf15"
  },
  {
    url: "public/images/pile_books.jpg",
    revision: "b3429523b1c3f5186394857aac6cf2c0"
  },
  {
    url: "public/images/pile.jpg",
    revision: "b17e5db04ed8f6d98786d35ddf11a982"
  },
  {
    url: "public/images/piled-books.jpg",
    revision: "8686fd0c59e661b5047818fb2fd2d8a1"
  },
  {
    url: "public/images/profile-image.jpg",
    revision: "4c27cd04fb50ae60ec0a95edd66103a5"
  },
  {
    url: "public/images/rslibrary-logo.jpg",
    revision: "75d772235aacc4f186fe0354a149a17f"
  },
  {
    url: "public/images/rslibrary-logo.png",
    revision: "efc7f0baf057c49211d6246d510a6104"
  },
  {
    url: "public/images/rslibrary-logo.svg",
    revision: "5cf9a62abdf492e9b774c09267b9cf1f"
  },
  {
    url: "public/images/sofa.jpg",
    revision: "998ab4ca6ef9cfb8e0b772e6fa82557f"
  },
  {
    url: "public/images/stack-of-magazines.jpg",
    revision: "27d4d138cf4d88a049f6f413657be9d3"
  },
  {
    url: "public/images/take-the-risk.jpg",
    revision: "56b019af334acbc45fa8a323e792afa5"
  },
  {
    url: "public/images/teacup.jpg",
    revision: "e3190a977db135cf039aee2d3d497dd7"
  },
  {
    url: "public/images/the-polaroid-book.jpg",
    revision: "80c91acfc40e0a77e79d35d5f1a17569"
  },
  {
    url: "public/images/waiting.svg",
    revision: "e6fa9b4e61380197818a95e9eaa4a400"
  },
  {
    url: "public/images/wall.jpg",
    revision: "01980763ec93db5255d87cbd9266f19d"
  },
  {
    url: "public/manifest.json",
    revision: "4a1d26aee5fe5bf48db4588533ea5313"
  },
  {
    url: "public/nprogress.css",
    revision: "1134a7e741ba4a46ffa5b2c48da15cf3"
  },
  {
    url:
      "public/precache.LEySjDUY-C9YqbY0uZC6d.53d17a5802112616f7d3ac652ed1860e.js",
    revision: "3318bd84fa2aa806df41d8143702bbc6"
  },
  {
    url: "public/sw.js",
    revision: "bb754791279364da271b65087421072a"
  },
  {
    url: "public/uploads/avatars/idowu-1574695240871.jpeg",
    revision: "65da12fe13afcaac9ec18493fcbb90ee"
  },
  {
    url: "public/uploads/avatars/John Doe-1574676216360.jpeg",
    revision: "bc7f85daf5cbb449f86694807bb7f3a6"
  },
  {
    url: "public/uploads/avatars/john-1574678340865.jpeg",
    revision: "bc7f85daf5cbb449f86694807bb7f3a6"
  },
  {
    url: "public/uploads/avatars/john-1574678430899.jpeg",
    revision: "bc7f85daf5cbb449f86694807bb7f3a6"
  },
  {
    url: "public/uploads/avatars/john-1574703278927.jpeg",
    revision: "bc7f85daf5cbb449f86694807bb7f3a6"
  },
  {
    url: "public/uploads/avatars/john-1574704813498.jpeg",
    revision: "d06fe53739e19cf91bc8a0debaa06bb4"
  },
  {
    url: "public/uploads/avatars/john-1574704895761.jpeg",
    revision: "5371388e755ed78917cfc104314dd1a8"
  },
  {
    url: "public/uploads/avatars/john-1574715663342.jpeg",
    revision: "d06fe53739e19cf91bc8a0debaa06bb4"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  /^https?.*/,
  new workbox.strategies.NetworkFirst({
    cacheName: "offlineCache",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 200,
        purgeOnQuotaError: false
      })
    ]
  }),
  "GET"
);
