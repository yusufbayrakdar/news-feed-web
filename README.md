# News Feed Web

This is a React app for news feeds. It serves news from The Guardian and New York Times. It has a filter interface. It arrange queries for your need and send it to the news APIs. You have following abilities with this website:

- Select news source: The Guardian or New York Times
- Search news in selected source
- Filter by date range: 'from-date' and 'to-date'
- Filter by categories. Choices are supplied from the API itself.

If you login the system, you can choose categories you liked. The system make your home page more relavent. It pick random categories you liked (up to 3). It arranges a query with these picked categories to send API. In this way, API gives more relavent news.

### Install

`npm i`

### Run

`npm run start`
