self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('portfolio-cache-v1').then(cache => {
      return cache.addAll([
        '/Portfolio.html',
        '/Portfolio.css',
        '/manifest.json',
        '/portfimg1.jpeg',
        '/portfimg2.jpg',
        '/portfimg3.jpg'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
Notification.requestPermission().then(permission => {
  if (permission === "granted") {
    console.log("Notifications allowed!");
    // You could show a welcome notification here
  }
});
self.addEventListener("push", function(event) {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body,
    icon: "images/favicon.png",
    badge: "images/badge.png"
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
const firebaseConfig = {
   apiKey: "AIzaSyDPZo-KYYxUicDcc7xfVmZD_lk0FhzsJZ4",
  authDomain: "swanandiportfoliopush.firebaseapp.com",
  projectId: "swanandiportfoliopush",
  storageBucket: "swanandiportfoliopush.firebasestorage.app",
  messagingSenderId: "155848724086",
  appId: "1:155848724086:web:1614a4a86a4270570a1957",
};

firebase.initializeApp(firebaseConfig);
Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    (firebase.messaging()).getToken({ vapidKey: "YOUR_PUBLIC_VAPID_KEY" }).then((token) => {
      console.log("FCM Token:", token);
    });
  }
});
importScripts("https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "...",
  messagingSenderId: "...",
  projectId: "...",
  appId: "..."
});

const messaging = firebase.messaging();

(firebase.messaging()).onBackgroundMessage(function(payload) {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/images/favicon.png"
  });
});

