# Technologies

This chapter provides a comprehensive overview of the technologies used in the Keyla project, including the rationale behind each choice and the role they play in the overall system architecture.

## Technology Stack Overview

The Keyla project employs a modern, cross-platform technology stack designed to deliver a robust typing test application with offline capabilities. The architecture is divided into three main modules:

- **Backend Module**: Scala-based REST API
- **Frontend Module**: Kotlin Multiplatform CLI application
- **Documentation Module**: VitePress for comprehensive project documentation

## Backend Module

### Scala 3

**Purpose**: Primary programming language for the backend API service.


### HTTP4s

**Purpose**: HTTP server and client library for building RESTful APIs.

**Role in Project**: Provides the HTTP server infrastructure for the REST API, handling all client-server communication between the CLI and backend.

### Tapir

**Purpose**: Type-safe API definition and documentation library.

**Key Features**:
- Type-safe endpoint definitions
- Automatic OpenAPI/Swagger documentation generation
- Multiple backend integrations (HTTP4s, Akka HTTP, etc.)
- Request/response validation

**Role in Project**: Defines the API contracts, generates interactive documentation, and ensures type safety across the entire API surface.

### Cats Effect 

**Purpose**: Functional programming library for asynchronous and concurrent programming.

**Role in Project**: Manages asynchronous operations, resource handling, and provides the foundation for functional programming patterns throughout the backend. Used, mainly, to handle the business logics.

### JSONiter

**Purpose**: High-performance JSON serialization/deserialization library.

**Role in Project**: Handles all JSON serialization, ensuring fast data exchange and type safety.

## Frontend Module

### Kotlin Multiplatform 

**Purpose**: Cross-platform development framework for the CLI application.

**Key Features**:
- Shared business logic across platforms
- Platform-specific implementations when needed

**Role in Project**: Enables the CLI to run natively on JVM, Linux, Windows, and macOS while sharing common code and maintaining platform-specific implementations.

### Kotter

**Purpose**: Terminal UI library for creating interactive command-line interfaces.

**Key Features**:
- Rich text formatting and colors
- Interactive prompts and menus
- Real-time UI updates
- Cross-platform terminal compatibility

**Role in Project**: Powers the modern terminal interface, providing real-time typing feedback, progress indicators, and interactive menus.

### Ktor

**Purpose**: HTTP client library for communicating with the backend API.

**Key Features**:
- Multi-platform HTTP client
- Platform-specific implementations (cURL, WinHttp, Darwin)

**Role in Project**: Handles all HTTP communication between the CLI and the backend API, with platform-optimized implementations for each target OS.

### MongoDB

**Purpose**: NoSQL database for persistent data storage.

**Key Features**:
- Flexible document-based data model
- Local deployment support

**Role in Project**: Stores user profiles, typing test results, analytics data, and system configuration with support for both local and remote deployments.

**Purpose**: Official MongoDB driver for Scala/Java applications.

**Key Features**:
- Synchronous and asynchronous operations
- Type-safe query building
- Connection pooling and management
- BSON document handling

**Role in Project**: Provides the interface between the Scala backend and MongoDB, handling all database operations and data persistence.

## Build and Development Tools

### SBT

**Purpose**: Build tool for the Scala backend project.

### Gradle

**Purpose**: Build tool for the Kotlin Multiplatform CLI project.

### Code Quality Tools

#### Scala Tools
- **Scalafmt**: Automatic code formatting
- **Scalafix**: Code linting and refactoring

#### Kotlin Tools
- **KTLint**: Kotlin code style checker
- **Detekt**: Static code analysis

## Documentation Module

### VitePress

**Purpose**: Static site generator for project documentation.

**Key Features**:
- Markdown-based content
- Vue.js-powered theming
- GitHub Pages integration

**Role in Project**: Generates the comprehensive project documentation website, providing an online version of all technical documentation and user guides.