# Requirements

This chapter defines the requirements for the Keyla typing test application. The requirements are organized into two main categories: functional requirements that specify what the system must do, and non-functional requirements that define how the system should perform and operate.

## 1. Functional Requirements

### 1.1 Core Typing Test Functionality

#### 1.1.1 Test Creation and Management
- The system shall allow users to create typing tests with configurable parameters
- The system shall support multiple test sources (dictionaries) per test
- Users shall be able to specify word count for tests
- The system shall support optional time limits for tests
- When a user starts a new test, any previously incomplete test for the same profile shall be automatically discarded and lost forever
- Users shall be able to restart an incomplete test (using the same words) if they haven't started a new test yet

#### 1.1.2 Text Transformation and Modifiers
- The system shall support the following text modifiers:
  - Uppercase conversion
  - Lowercase conversion
  - Text reversal
  - Capitalization (first letter of each word)
  - Whitespace trimming
- Multiple modifiers shall be able to be applied in sequence

#### 1.1.3 Test Execution and Results
- The system shall track real-time typing metrics during test execution
- The system shall calculate and store the following metrics:
  - Words Per Minute (WPM)
  - Accuracy percentage (both raw and adjusted)
  - Error count and positions
  - Test duration
- The system shall support test completion and result submission

### 1.2 User Profile Management

#### 1.2.1 Profile Operations
- The system shall allow creation of user profiles with name and email
- Users shall be able to retrieve individual profiles by ID
- The system shall support listing all user profiles
- The user shall be able to customize the settings for each profile
- Users shall be able to update and delete profiles

### 1.3 Dictionaries

#### 1.3.1 Dictionary Management
- The system shall support JSON format dictionaries
- The system shall support TXT format dictionaries
- Users shall be able to add custom dictionaries by placing files in the dictionaries directory
- Users shall be able to retrieve the list of all available dictionaries

#### 1.3.2 Dictionary Merging
- The system shall support merging multiple dictionary sources for a single test
- Configurable merge operations shall be available for combining dictionaries
- Users shall be able to retrieve all the available merge operations

### 1.4 Statistics and Analytics

The system distinguishes between two types of performance data:

- **Statistics**: Individual test metrics that capture the performance of a single typing test session. These include raw data such as WPM, accuracy, duration, and error for that specific test.

- **Analytics**: Aggregated insights derived from multiple test statistics for a user profile. These provide trends, averages, and progress tracking across all tests taken by a user.

#### 1.4.1 Statistics Storage
- The system shall store individual test statistics for each completed test
- Users shall be able to visualize statistics after completing a test

#### 1.4.2 Analytics and Reporting
- The system shall calculate aggregated analytics across all tests for a user profile
- Comprehensive user performance reports shall be provided based on these aggregated analytics

### 1.5 Configuration Management

#### 1.5.1 System Configuration
- The system shall support runtime configuration management
- Configuration shall be able to be reloaded without restart (when possible)
- The system shall support reset to default configuration

## 2. Non-Functional Requirements

### 2.1 Platform and Deployment

#### 2.1.1 Multi-Platform Support
- The system should be supported on Windows, MacOcs and Linux.
- The applications requires only a terminal for operation
- The system supports both local and remote db connections

#### 2.1.2 Data Persistence
- The system supports in-memory data persistence for local use
- The system supports MongoDB for persistent data storage
- The system can be configured to use either persistence method

### 2.2 Usability

#### 2.2.1 User Experience
- The system provides clear error messages and help text
- The system supports an intuitive command-line interface

#### 2.2.2 Documentation
- The system provides comprehensive API documentation
- Clear usage instructions are available for the CLI
