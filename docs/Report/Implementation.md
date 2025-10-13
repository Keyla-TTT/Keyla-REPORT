
# Implementation
This chapter describes how the various functionalities of the project were implemented.
Keyla was developed on 2 fronts: 
- **Backend** that handles the logic and the 
- **CLI interface** that guides the user in using the software and manages the system execution flow.

## Backend
The Backend part was subdivided into multiple modules (or packages) to facilitate maintenance, 
maintaining the concept of single responsibility.
- **User Management**
- **TypingTest**
- **Analytics**
- **Api**

All the modules interact with the CLI through the API module, which exposes all the functionalities 
via a REST interface where all the functionalities have its own endpoint.

### API
The `API` module defines the communication interface between frontend and backend, providing a structured set of endpoints to access system functionalities.

The API architecture follows the REST pattern, organizing operations into 
logical resources corresponding to the main backend modules.

HTTP request and response handling is delegated to a routing layer that takes care of:
- Routing requests to appropriate services
- Handling errors and exceptions
- Serializing and deserializing JSON data

The API module implements the Controller pattern through a three-layer 
structure that ensures separation of concerns:

1. **Controller Layer**: Each REST resource is managed by a dedicated controller 
that exclusively handles:
    - Receiving incoming requests
    - Delegating processing to business layer services
    - Formatting HTTP responses with appropriate status codes
    - Handling presentation layer specific exceptions

2. **Service Layer**: Controllers interface with services from respective backend modules 
that contain business logic. 
This separation allows to:
    - Reuse business logic in contexts other than REST API
    - Test business logic and presentation logic separately

3. **Repository Layer**: Services in turn use repositories for data access.

This implementation ensures that each controller has a specific and limited responsibility, 
making the code more maintainable and testable.
Controllers act as intermediaries between the HTTP protocol and business logic,
translating requests into calls to appropriate services and transforming results into structured HTTP responses.

## Frontend / CLI

This section describes how Keyla's CLI interface is implemented and how it orchestrates user interaction.

### Architecture Overview
Key components and their roles:

- **Controller**: coordinates the active application mode and delegates work to the corresponding UI session,
keeping cross‑mode rules (e.g., profile presence, connectivity checks) in one place.

- **UI sessions**: each mode defines a small, fixed list of screens and a state data class. 
The UI renders from state, 
and a single event loop handles key presses and runs small background tasks to load or save data.

- **Service facades**: provide simple functions for tests, profiles, configuration, languages, analytics, and statistics. 
It hides HTTP calls and JSON parsing, returning plain Kotlin models used by the rest of the application.

- **Configuration and persistence**: maintains app settings such as the backend base URL and the active profile.

- **Platform abstractions**: Interfaces that provide the HTTP client engine, local storage, and basic platform utilities for each target. The shared logic stays the same across all platforms.

### Entry Points
The launcher accepts a single command and starts the corresponding mode:
- `test` (default)
- `config`
- `settings`
- `history`
- `stats`
- `profile`

### State Management
Each mode is modeled as a **stateful** screen. 
The UI is rendered from state: a single event loop listens for key presses, updates state,
and re‑renders. 
**Async handlers** load or save data through the service facade and then update the state.

### Platforms
Shared logic lives in common code. 
The platform modules provide the HTTP client and local storage. 
Native builds exist for JVM, Linux, Windows, and macOS.

### Commands
```bash
keyla test
keyla config
keyla settings
keyla history
keyla stats
keyla profile
```
