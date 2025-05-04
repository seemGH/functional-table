# FunctionalTable

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.3.

## Project Requirements

The goal of this project is to create a "functional" table (similar to a spreadsheet) with the following features:

- **Filtering**: Users can filter table rows using an input field to search across specified columns.
- **Sorting**: Users can sort table data by clicking on column headers.
- **Pagination**: Users can navigate through pages and select the number of entries per page.
- **Column Visibility**: Users can show or hide columns dynamically to customize the table view.
- **Data Source**: The table uses an example JSON file as the data source.
- **Asynchronous Emulation**: The frontend emulates asynchronous data requests with random response times to simulate a backend.
- **Code Quality**: Emphasis is placed on functionality and high-quality, maintainable code.
- **Optional - Attractive Design**: The UI/UX is designed to be visually appealing, with a focus on user experience.
- **Optional - Mobile-Friendly Design**: The table is responsive and optimized for mobile devices.

The example JSON data source is available [here](https://drive.google.com/file/d/1iaKQTTp3eYJO8PA-0kgleIGNLMoAnNMO/view).

## Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project, run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running Unit Tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running End-to-End Tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.