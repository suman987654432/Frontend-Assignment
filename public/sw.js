self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || 'HealthCore Notification';
  const options = {
    body: data.body || 'You have a new update.',
    icon: '/vite.svg',
    badge: '/vite.svg',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
