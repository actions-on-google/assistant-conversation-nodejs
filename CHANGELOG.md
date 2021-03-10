# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.4.0] - 2021-03-10
### Added
- Add playlist features to media prompt

## [3.3.0] - 2021-02-01
### Added
- Add request verification

### Changed
- Update library Typedoc settings based on breaking changes

## [3.2.0] - 2020-10-09
### Added
- Support for Collection Browse.

### Changed
- Conversation to accept custom logger interface.
- google-auth-library to new major version.

### Fixed
- PromptItem type errors.

## [3.1.0] - 2020-08-26
### Added
- Support for Canvas state.

### Fixed
- Options not existing for public interface.

## [3.0.1] - 2020-06-17
### Fixed
- Logs were incorrectly prefixed with "assistant-conversation-nodejs" instead of "assistant-conversation".

## [3.0.0] - 2020-06-17
### Added
- Support for Actions Builder and Actions SDK.
- Support for new media features like media controls and media progress.
- Support for home storage.

### Changed
- Simplify and align the names of the raw JSON API and fulfillment library. 
- Redesign API objects to be based directly on raw JSON objects.
- Update type code generation to use published JSON schema.
- Merge conv.ask and conv.close into conv.add to reflect conversation exits being defined by the Actions Builder console.

### Removed
- Support for Node <10.
- Support for the legacy Actions SDK.
- Support for Dialogflow.
- Smart home support (continued support in actions-on-google).

[Unreleased]: https://github.com/actions-on-google/assistant-conversation-nodejs/compare/v3.2.0...HEAD
[3.2.0]: https://github.com/actions-on-google/assistant-conversation-nodejs/compare/v3.1.0...v3.2.0
[3.1.0]: https://github.com/actions-on-google/assistant-conversation-nodejs/compare/v3.0.1...v3.1.0
[3.0.1]: https://github.com/actions-on-google/assistant-conversation-nodejs/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/actions-on-google/assistant-conversation-nodejs/releases/tag/v3.0.0
