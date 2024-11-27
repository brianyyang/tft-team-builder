## Feature Todos

### Frontend

- Create basic team building page
  - ~~Left panel with 5 tiers of champions~~
  - ~~Right side with slots for champions on the team~~ --- default 10 but have a square with a `+` to add more slots
- QoL improvements to champion selector
  - Search and filters for champions on the left side
  - Trait tooltip hovers
  - Champion ability hovers
- Team actions and account management
  - ~~Edit team name button~~
  - ~~Save team to account button~~
  - ~~Randomize team button~~
  - ~~Clear team button~~ → need choose a better icon than garbage can
  - Header browse teams button (opens modal for library management)

### Backend

- ~~Create types for champions and traits~~ --- _ended up creating classes on the frontend and models for the backend_

### Organization

- ~~Organize json data and icons~~ --- _organized in assets and data folders_
- Finish writing README.md
  - Include details on how the scripts work

#### Minor Nice to Haves

- ~~Remove laggy image loading~~ --- _created image cacher component that loads in all champion and trait images_
- ~~Focus team name text input when edit button is pressed~~ --- _used focus trap from Mantine_
