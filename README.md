

API Documentation
This document outlines the endpoints available for accessing subscription-related data.

Subscribes
Endpoint: /subscribes
Method: GET
Description: Retrieves a list of subscriptions.
Backend Access: The backend server should handle GET requests to this URL to fetch subscription data.
Subscribes Screenshot
![subs1](https://github.com/Jatinparjapt/youtubesubscriber/assets/88338341/79bc8f6f-62ca-48d3-951c-dd444ceacb17)
Subscribers Names
Endpoint: /subscribers/names
Method: GET
Description: Retrieves a list of subscriber names.
Backend Access: The backend server should handle GET requests to this URL to fetch subscriber names.
Subscribers Names Screenshot
![subs2](https://github.com/Jatinparjapt/youtubesubscriber/assets/88338341/a25f656b-0892-4f69-ad87-ad6d95a27ce3)
Subscribes by ID
Endpoint: /:id
Method: GET
Description: Retrieves subscription information based on the provided ID.
Backend Access: The backend server should handle GET requests to this URL, replacing :id with the actual ID of the subscription to retrieve specific subscription details.
Subscribers id Screenshot
![subs3](https://github.com/Jatinparjapt/youtubesubscriber/assets/88338341/b90959ec-112c-4808-bb2e-d4e33e4ed98c)
