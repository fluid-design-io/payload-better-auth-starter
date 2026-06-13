> Note:
> This guide is optimized for agents and AI-assisted refactors. It focuses on
> codebase shape: folders, file ownership, export boundaries, naming, and how
> composition patterns map onto those structures.

## Abstract

React and React Native codebases become hard to maintain when composition
patterns are present in the UI layer but not reflected in the file system.
Monolithic files, bag-of-exports modules, generic names, and route wrappers that
own domain orchestration all increase churn.

This guide defines four distinct rule areas:

1. shared component folders
2. route-bound domain modules
3. public API boundaries
4. naming stems and suffixes

Folder location (`components/`, `screens/`, or any repo-specific tree) is
orthogonal to these rules. In this guide, *feature* names the domain module
being refactored — checkout, calendar, cart — not a literal `features/`
directory. A module under `components/` can own route-bound screens; a module
under `screens/` can expose a shared compound namespace. The rules describe
module shape, not where the repo places its top-level folders.
