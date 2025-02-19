# TV Shows Dashboard Application

This project is a frontend application built with Vue 3 and TypeScript. It displays a dashboard of TV shows, grouped by predefined genres, and allows users to view show details, search for shows, and manage a watchlist.

## Table of Contents

- [Installation and Setup](#installation-and-setup)
- [Running the Application](#running-the-application)
- [Running the Tests](#running-the-tests)
- [Design Choices](#design-choices)
- [Future Enhancements](#future-enhancements)

## Installation and Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/MarcoGuarnera/tvShowApp.git
   cd my-tv-shows-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Node Version**
   This project was developed using Node.js v23.3.0. Please ensure your environment uses the same or a compatible version.

## Running the Application

To run the application in development mode, use the following command:

```bash
npm run dev
```

This will start the Vite development server. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:3000).

## Running the Tests

I used Vitest as the test runner along with Vue Test Utils for unit testing. To run all tests, use:

```bash
npm run test
```

## Design Choices

#### API Calls and Performance

###### Limited API Calls:

- The application makes API calls only to the first two pages of the TVMaze API. This decision was made to avoid heavy performance costs associated with fetching all pages using `Promise.all` or background synchronization—even with caching—as it proved too heavy on performance.

###### Alternative Approaches:

- In an ideal scenario, an API endpoint that returns shows by genre would be used.
- Alternatively, additional shows could be fetched on-demand as the user scrolls the carousel, or SSR could be implemented to reduce the performance impact.

#### Genres

###### Defined Set of Genres:

- Instead of generating the genre set dynamically from the API (which would result in significant repetition because many shows belong to multiple genres), a predefined set of genres is used.

  - This approach mimics popular streaming platforms by curating the list of genres to display.
  - In an ideal scenario, the genres could be selected based on popularity or user preferences.

- Genre Page Behavior:
  - The genre page displays the shows currently in memory for that genre rather than all available shows. Due to time constraints, this part was kept simple, and page reload is not supported by design; users must navigate to it.

#### Show Details and Data Fetching

###### Detail Page API Call:

- The show detail page makes a separate API call to retrieve detailed information.
  - This ensures that if the user reloads the detail page, the latest data is fetched.
  - It also allows the detail page to be accessed from search results without relying on cached data.

#### UI and Styling

###### Scoped Styles:

- Scoped styles are used within each component to keep the styles encapsulated and simpler since the application is not that big.
  - In a larger project, a modular approach using separate CSS/SCSS files might be preferable.

###### Component Reusability:

- Reusable components (such as BaseButton, BaseCard, CarouselBlock, etc.) are implemented to ensure consistency across the application.
- The styling in general is pretty simple to not overcomplicate the project

#### Unit Testing

- Unit tests have been written for most components using Vue Test Utils and Vitest.
  - Due to time constraints, not every component is tested.

#### Internationalization (i18n)

###### Hardcoded Text:

- Many text values are currently hardcoded in the templates.
  - In an ideal scenario, an i18n solution would be implemented to remove hardcoded strings and support localization.

## Future Enhancements

There are several features and improvements that I planned for but decided to focus on something else first:

- **Genres List in Detail Component:**

  - Adding a badge component to display genres in the detail view.

- **Image Loading Animations:**

  - Implementing animations for image loading similar to YouTube's approach.

- **Enhanced Error Handling:**

  - Introducing error handling with a modal to notify the user of API errors.

- **Internationalization (i18n):**

  - Integrating an i18n library to remove hardcoded text and support multiple languages.

- **Navigation Loading Spinner:**
  - Displaying a loading spinner during route navigation for improved user experience.
