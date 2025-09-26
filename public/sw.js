// Service Worker for ZenZone PWA
const CACHE_NAME = 'zenzone-v1'
const urlsToCache = [
  '/',
  '/dashboard',
  '/mood',
  '/journal',
  '/goals',
  '/habits',
  '/meditation',
  '/crisis',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
]

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
})

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response
        }
        return fetch(event.request)
      })
  )
})

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Background sync for offline data
self.addEventListener('sync', (event) => {
  if (event.tag === 'mood-sync') {
    event.waitUntil(syncMoodData())
  }
  if (event.tag === 'journal-sync') {
    event.waitUntil(syncJournalData())
  }
  if (event.tag === 'habit-sync') {
    event.waitUntil(syncHabitData())
  }
})

// Push notifications
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey,
        url: data.url
      },
      actions: [
        {
          action: 'view',
          title: 'View',
          icon: '/icons/view-icon.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/icons/close-icon.png'
        }
      ]
    }

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  }
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('Notification click received.')

  event.notification.close()

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    )
  }
})

// Helper functions for background sync
async function syncMoodData() {
  try {
    const cache = await caches.open('mood-data')
    const requests = await cache.keys()
    
    for (const request of requests) {
      if (request.url.includes('/api/mood')) {
        const response = await cache.match(request)
        const data = await response.json()
        
        // Try to sync with server
        try {
          await fetch('/api/mood', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.token}`
            },
            body: JSON.stringify(data.moodData)
          })
          
          // Remove from cache after successful sync
          await cache.delete(request)
        } catch (error) {
          console.log('Failed to sync mood data, will retry later')
        }
      }
    }
  } catch (error) {
    console.error('Error syncing mood data:', error)
  }
}

async function syncJournalData() {
  try {
    const cache = await caches.open('journal-data')
    const requests = await cache.keys()
    
    for (const request of requests) {
      if (request.url.includes('/api/journal')) {
        const response = await cache.match(request)
        const data = await response.json()
        
        try {
          await fetch('/api/journal', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.token}`
            },
            body: JSON.stringify(data.journalData)
          })
          
          await cache.delete(request)
        } catch (error) {
          console.log('Failed to sync journal data, will retry later')
        }
      }
    }
  } catch (error) {
    console.error('Error syncing journal data:', error)
  }
}

async function syncHabitData() {
  try {
    const cache = await caches.open('habit-data')
    const requests = await cache.keys()
    
    for (const request of requests) {
      if (request.url.includes('/api/habits/entries')) {
        const response = await cache.match(request)
        const data = await response.json()
        
        try {
          await fetch('/api/habits/entries', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.token}`
            },
            body: JSON.stringify(data.habitData)
          })
          
          await cache.delete(request)
        } catch (error) {
          console.log('Failed to sync habit data, will retry later')
        }
      }
    }
  } catch (error) {
    console.error('Error syncing habit data:', error)
  }
}
