# Weather App
## Setup and Running Instructions
### Local
Prerequisites
- Node.js (LTS recommended, e.g. v18+) and npm installed. Verify with `node -v` and `npm -v`.

Clone and run locally
- Clone the repository:
  ```
  git clone https://github.com/mrcrawfo/weather_app.git
  ```
- Change into the project directory:
  ```
  cd weather_app
  ```
- Install dependencies:
  ```
  npm install
  ```
- Start the development server:
  ```
  npm run dev
  ```
- The dev server will print a local URL when it starts (commonly http://localhost:3000 or http://localhost:5173). Open that URL in your browser.

Notes and troubleshooting
- This is a standalone frontend repo; there is no additional backend required to run concurrently. For component preview/tests see the Testing section below
- If Node version mismatches cause issues, use nvm to install and select the recommended Node version:
  ```
  nvm install 18
  nvm use 18
  ```

#### Testing
Run Storybook and automated tests:

- From the command line run `npm run storybook` to open Storybook on `localhost:6006`.
- From the command line run `npm run test` to run automated tests (there are currently no unit tests).

### Hosted
This application is deployed to Vercel and is publicly available at:
https://weather-app-dun-three-14.vercel.app/
 
## Overview
This is an example frontend application that consumes the National Weather Service Web API to fetch and present weather information in several user-facing formats. It demonstrates core front-end engineering skills by implementing:
- A seven‑day forecast summary for planning and overview.
- An hourly forecast view (up to a 72‑hour window) for granular, near‑term detail.
- A comparison mode that displays current conditions and side‑by‑side temperature trends for two locations.

The app focuses on client-side concerns (React components, custom hooks, data transformation and visualization, and lightweight persistence (such as localStorage for favorites) and is intended to showcase engineering and product thinking rather than to serve as a full production weather platform. Completed under a constrained timeline, the app is functionally complete and demonstrates the intended engineering and product decisions, but several non‑critical items were intentionally deprioritized to stay within range of the intended length of the exercise. Areas that may need additional work before production use include visual polish / User Experience, broader automated test coverage, comprehensive accessibility QA and remediation, and further hardening around edge cases and performance. Known trade‑offs and recommended next steps are documented elsewhere in this README for future refinement.

## Assumptions and Design Decisions
- Assumed that the default use of this application would be to check the current local weather, so it will reset state with every page load to use geolocation (allowing customn location input as a secondary mode)
- Assumed that hourly forecasts are used for more granular information where more precision is desireable; further assumed that a wider forecast window becomes increasingly inaccurate, so limited this view to the next 72 hours regardless of how many are returned by the fetch
- Assumed that reviewers have seen the default icons from the National Weather Service every time they have reviewed an applicant's submission - took this as an opportunity to use a handful of freely-available LottieFiles instead, which adds visual variety in the form of novelty and animation
- Assumed that Comparison view was primarily concerned with "live" weather conditions, so the component only takes the most current weather period available for specific details (wind speed, etc) and only charts temperatures for extended forecast comparison
- Used a package `country-state-city` for Geocoding - [https://www.npmjs.com/package/country-state-city](https://www.npmjs.com/package/country-state-city) - to provide a static list of "all" US cities with associated lat/long coordinates
  - This was an expedient design decision that may be limiting, because it is a finite list rather than a dynamic fetch. The alternatives at a glance seemed to be using the Google Maps API to dynamically search whatever the user typed into a single input field (more flexible/robust but more complex to integrate with, would require an API key for deployment, and could incur fees for excessive queries) or implement a more rigid set of city/state inputs (that would have been harder to deliver a smooth User Experience while validating for accessibility in the time provided)
- Leaned heavily into custom hooks in order to demonstrate proficiency, following up from discussion in the previous round of technical interview

## Description of Features Implemented
### Location Selector
This defaults to geolocation, with a toggle to select between geolocation (the default) and allowing the user to input a custom location (limited to known city/state combinations within the United States). Custom locations can also be added to the Favorites list for quick recall on subsequent visits - Favorite locations are saved to the local storage, so will persist across page loads.

The implementation uses the browser Geolocation API as the primary source. Manual input is backed by a static city/state dataset (sourced from the `country-state-city` package) that is resolved to latitude/longitude pairs client-side. Favorites are serialized as JSON and persisted to localStorage under a stable key, with simple de-duplication and ordering logic applied when adding entries. The UI includes lightweight client-side filtering and leverages the virtualization features built into MUI's Autocomplete component to handle a very large array of options.

### Seven Day Forecast
This is the default view of the forecast data, as its Accordion is expanded automatically after loading. Overnight values are removed from the dataset (except for the current day when viewed in PM hours) to reduce to a clean view of seven tiles representing the current week.

Each tile contains preformatted timestamps, a representative temperature and short forecast, and an icon mapping step that normalizes NWS `shortForecast` strings to locally hosted Lottie animations (with fallbacks). Timezone-aware date handling is applied to ensure tiles align with the user's local calendar day.

### Hourly Forecast
This view is expandable to show the next 72 hours in the hourly forecast. Similar to the seven day forecast, each time slice is rendered as a ListItem with associated icon and data, although the information displayed by these items is reduced for readability.

Each ListItem renders a compact set of fields (time, temperature, shortForecast, precipitation probability when available) and reuses the same icon-mapping logic as the daily view. Because hourly periods often lack `detailedForecast` text, the UI emphasizes visual clarity and succinct numeric fields. Rendering performance is considered: the list is kept shallow and could be virtualized if the dataset or UI complexity grows.

### Comparison
A simple A/B display of two `LocationView` Cards next to each other for quick reference. The "primary" location will always be the result of Location Selector (the same location forecast used to populate the other view components) but the "secondary" location can be selected and is only used here.

The Comparison view synchronizes chart scales and units to enable accurate side-by-side analysis. The ComparisonGraph is implemented by mapping the two locations' `forecastHourly` values against each other and rendering the result with Highcharts, ensuring aligned axes and consistent units across series.

## Bugs / Known Issues
- Geolocation is a single-time read instead of refreshing/updating if the user's location changes over time
- Could not find a 1:1 mapping of LottieFiles weather icons (at least not in a pack from the same designer for visual consistency) so not every `shortForecast` value has an exact icon mapped to it. Additionally, documentation did not yield an exact list of expectable `shortForecast` values (suggesting it is not an enum as initially expected) so there is regex logic to match those with common sense mappings, and fall back to NWS default icons when one cannot be found
- Reached LottieFiles download limit for my account with an incomplete icon set - evening/overnight times in the Hourly view still display a sun instead of a moon
- I was not able to efficiently translate `forecast` and `forecastHourly` into precise TypeScript interfaces within the time available, so the NWS responses are received using `any` instead of a proper type translation of their schemas
 
## Future Improvements / Next Steps
- Greatly expand unit testing - the `vitest` library was added and a command exists to run tests once they can be added, leaving a pointer towards the intended implementation. Similarly, visual UI tests have been added to the project's capabilities in the form of Storybook, but there was only time to create a single file (`WeatherIcon.stories.ts`) as a proof-of-concept to demonstrate how future test files should be created
- Perform a dedicated compatibility and standards conformance pass (cross‑browser/device testing, accessibility/ARIA verification, and any necessary polyfills or progressive enhancement). This work was intentionally deprioritized due to the time‑boxed nature of the exercise and should be completed prior to production deployment
- Would want to replace the daily/hourly weather indicator icon with a custom-designed set of animations covering all cases in a visually consistent way (would also need to identify _"all"_ `shortForecast` or somehow catch edge cases if it is not a finite set)
- Refactor `LocationSelector.tsx` to be more of a reusable component for both its initial placement and selecting the secondary location in Comparison
- Add some notion of grouping to the Hourly weather view - to avoid repeating the date in each tile, put it as a separator between grouped hours in each separate day
- This was designed as a Single Page Application to consolidate functionality to one location and avoid routing, but in the future it would be good to add URL parameters to track when a custom location is loaded, for example, to give the user a way to share or restore application state through the URL
- Expand `ComparisonView.tsx` to allow selecting from stored Favorite Locations
- Improved usage and indication of loading states throughout the application, as well as surfacing relevant error messages to the user as needed
- Refactor the implementation of Autocomplete to replace the static location list with live asynchronous queries to the Google Maps API, per this example - [https://github.com/mui/material-ui/blob/v7.3.5/docs/data/material/components/autocomplete/GoogleMaps.tsx](https://github.com/mui/material-ui/blob/v7.3.5/docs/data/material/components/autocomplete/GoogleMaps.tsx)
- Even though this was a frontend exercise, it would be reasonable at some point to move certain tasks to a backend and reduce the work required on the client side
  - Specifically the list of city/state combinations to populate the Autocomplete could be precalculated server-side and fetched by the client; since this is not expected to change frequently it would likely save a lot of repeated efforts by caching the result for repeated use

## Credits
- Weather icons provided by [LottieFiles](https://lottiefiles.com/) user [jochang](https://lottiefiles.com/vdr0uy2wwsoljqtc)
