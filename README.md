# TOUCAN

## Client
### Tech

- TypeScript
- React 18.x
- Hooks
- Context API


### Folder Structure
**assets**: This folder contains common styles and public assets that can be used across the project.
**components** : This folder houses layout components, which are responsible for rendering the UI. It is further organized into sub-folders based on the Atomic Design methodology:<br>
&nbsp;&nbsp;&nbsp;&nbsp;**atoms**: Contains individual element layouts, such as buttons, input or fields.<br>
&nbsp;&nbsp;&nbsp;&nbsp;**molecules**: Groups atoms together to create more complex components, like a search bar or a dropdown.
&nbsp;&nbsp;&nbsp;&nbsp;**organisms**: Combines molecules, atoms, to form larger, self-contained units representing UI modules.
&nbsp;&nbsp;&nbsp;&nbsp;**templates**: Contains CSS specific to page templates, defining the overall layout and structure of pages.
**containers**: This folder holds components responsible for managing state and data. These components typically interact with the store or data sources, encapsulating logic related to data retrieval, manipulation, or state management.<br>
**models**: This folder contains model interfaces, which define the structure and shape of data models used in the application.<br>
**store**: This folder encompasses components related to the global store, implemented using the Context API. It is responsible for managing application-wide state and provides a way to share data and functionality between components.





 