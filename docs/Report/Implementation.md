
# Implementation
This chapter describes how the various functionalities of the project were implemented.
Keyla was developed on 2 fronts: the backend that handles the logic and the CLI interface that guides the user in using the software and manages the system execution flow.

## Backend
The Backend part was subdivided into multiple modules (or packages) to facilitate maintenance, maintaining the concept of single responsibility.
- **UserManagement**: Handles user management.
- **TypingTest**: Handles creating and managing typing tests.
- **Analytics**: Handles calculating and displaying test statistics.
- **Api**: Handles API definition and endpoint management.

<!-- Add a small descriptive part that introduces the API section -->

### API
The `API` module defines the communication interface between frontend and backend, providing a structured set of endpoints to access system functionalities.

The API architecture follows the REST pattern, organizing operations into logical resources corresponding to the main backend modules. Endpoints are grouped into the following categories:

**User Management Endpoints:**
- `GET /users/{id}`: retrieves information of a specific user profile
- `POST /users`: creates a new user profile
- `PUT /users/{id}`: updates an existing user profile
- `DELETE /users/{id}`: deletes a user profile
- `GET /users`: retrieves the list of all user profiles

**Typing Test Endpoints:**
- `POST /tests`: creates and starts a new typing test
- `GET /tests/{id}`: retrieves details of a specific test
- `GET /users/{userId}/tests`: retrieves all tests of a user
- `GET /users/{userId}/tests/last`: retrieves the last completed test by a user
- `DELETE /tests/{id}`: deletes a specific test

**Analytics Endpoints:**
- `GET /users/{userId}/analytics`: retrieves aggregated statistics of a user
- `GET /users/{userId}/analytics/period`: retrieves statistics for a specific period
- `GET /users/{userId}/statistics`: retrieves individual test statistics

HTTP request and response handling is delegated to a routing layer that takes care of:
- Validating input parameters
- Routing requests to appropriate services
- Handling errors and exceptions
- Serializing and deserializing JSON data

**Controller Pattern Implementation:**

The API module implements the Controller pattern through a three-layer structure that ensures separation of concerns:

1. **Controller Layer**: Each REST resource is managed by a dedicated controller (`UserController`, `TypingTestController`, `AnalyticsController`) that exclusively handles:
    - Receiving incoming HTTP requests
    - Extracting and validating parameters from requests
    - Delegating processing to business layer services
    - Formatting HTTP responses with appropriate status codes
    - Handling presentation layer specific exceptions

2. **Service Layer**: Controllers interface with services from respective backend modules (`UserManagement`, `TypingTest`, `Analytics`) that contain business logic. This separation allows to:
    - Keep controllers lean and focused on HTTP handling
    - Reuse business logic in contexts other than REST API
    - Test business logic and presentation logic separately

3. **Repository Layer**: Services in turn use repositories for data access, completing the layered architecture.

This implementation ensures that each controller has a specific and limited responsibility, making the code more maintainable and testable.
Controllers act as intermediaries between the HTTP protocol and business logic, translating requests into calls to appropriate services and transforming results into structured HTTP responses.

## Frontend / CLI

This section describes how Keyla's CLI interface was implemented, which represents the main access point for users.

### State Management

The implementation is based on the concept of finite state automaton, where each screen represents a specific system state.
Each state/screen presents users with a set of options related to available backend endpoints for that context:

- **Main Menu**: Initial state that presents main options (profiles, tests, statistics)
- **Profile Management**: Manages creation, modification and selection of user profiles
- **Test Execution**: Coordinates typing test execution
- **Analytics View**: Displays statistics and analytical data
- **Settings Configuration**: Allows configuration of CLI and backend settings

### State-Endpoint Mapping

Each CLI state is associated with specific backend endpoints:

```kotlin
// Example mapping for ProfileState
ProfileState --> {
    GET /users          // List profiles
    POST /users         // Create profile
    PUT /users/{id}     // Modify profile
    DELETE /users/{id}  // Delete profile
}
```

Transitions between states occur based on user choices, maintaining application flow consistency and ensuring each screen presents only options associated with that context.

### Main Commands

- **`keyla start`**: Starts the interactive interface from the main menu
- **`keyla profile`**: Direct access to user profile management
- **`keyla test`**: Typing test management
- **`keyla stats`**: Statistics display
- **`keyla config`**: System configuration
- **`keyla version`**: Shows application version
- **`keyla help`**: Displays complete command guide

### Interactive Mode vs Command Mode

The CLI supports both single command execution and interactive mode:
- Direct commands allow automation and integration in scripts
- Interactive mode allows navigation by moving between screens using on-screen options

### Configuration Management

The CLI maintains two distinct types of configurations to ensure usage flexibility:

**Backend Configurations**
Manages backend parameters:
- Settings for test generation (length, difficulty, modifiers)
- Statistics calculation parameters
- Database configurations

**Local CLI Configurations**
Maintains interface-specific settings:
- **Active Profile**: Selected user profile ID
- **API URL**: Backend endpoint to connect to (local or remote)
- **Display Preferences**: Output formatting, language
- **Local Cache**: Temporary data to improve performance

### Multiplatform with Kotlin Multiplatform

The implementation leverages Kotlin Multiplatform to ensure cross-platform compatibility.
The idea is to allow native execution on all major operating systems without writing platform-specific code.

### Multiplatform Solution Benefits

1. **Shared Code**: Main logic is implemented once and shared across all platforms
2. **Native Performance**: Native compilation for each specific target (Windows, Linux, macOS)
3. **Platform-Specific APIs**: Access to native operating system APIs
4. **Simplified Distribution**: Platform-specific binaries without external dependencies

### Operating System Support
The following platforms have been configured for Keyla:
- **Windows**: generates a `.exe` binary file
- **Linux**: generates a native binary file compatible with major distributions
- **macOS**: generates a native binary file for macOS

The CLI implemented this way allows everyone to navigate the application with simplicity and with any operating system.
