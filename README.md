# google-clone

# To Run the application
just run the index.html file or click live server in index.html page

# Tech Stack

HTML5:
Provides the basic structure of the web application, allowing you to define elements like the menu bar, formula bar, grid container, and sheets container.

CSS3:
Used for styling and layout, including responsive design through media queries. This helps ensure that the application adapts to different screen sizes and devices, providing a user-friendly interface.

JavaScript (ES6):
Powers the dynamic behavior of the spreadsheet. It handles user interactions, such as cell selection, editing, and formula evaluation, by manipulating the Document Object Model (DOM) and updating the underlying data structures.

FontAwesome:
Integrated via CDN to provide scalable vector icons for various UI elements like the menu bar icons (new, open, save, formatting icons).

SheetJS (xlsx):
Included via CDN for potential export functionality (e.g., exporting the sheet data to an Excel file), enhancing the application's capability to interact with popular file formats.

# Data Structures

2D Array (Grid Database):
The core data structure is a two-dimensional array (sheetsDB) that mimics the layout of a spreadsheet. Each element of this array represents a row, which in turn is an array of cell objects. This structure allows for direct access and updates to any cell using its row and column indices.

Cell Object:
Every cell in the grid is represented by an object containing properties such as:

value: The displayed value of the cell.
formula: The formula (if any) entered by the user.
formatting properties: Including fontFamily, fontSize, bold, italic, underline, color, and backgroundColor.
children: An array tracking dependent cells that rely on the cell's value (used for updating formulas dynamically).
This object-based approach makes it easy to extend functionality, such as adding more formatting options or implementing advanced formula dependencies.

Event Listeners:
The application uses event listeners on cells (e.g., click, blur, and keydown events) to provide a two-way binding between the UI and the underlying data. When a user interacts with a cell, the corresponding cell object in the 2D array is updated, and vice versa, ensuring the UI always reflects the current state of the data.

# Why These Choices?

Natural Mapping to Spreadsheets:
The 2D array directly mirrors the row-and-column layout of traditional spreadsheets, making it an intuitive and efficient choice for storing and managing cell data.

Performance and Simplicity:
By using native HTML, CSS, and JavaScript, the application remains lightweight and fast. This simplicity also makes the code easier to understand and maintain.

Scalability and Extensibility:
The modular design—separating the UI (HTML/CSS) from the logic (JavaScript) and data (2D array of cell objects)—allows for future enhancements. New features, such as additional formatting options or advanced formula parsing, can be integrated without significant changes to the existing codebase.

Interactive and Responsive Experience:
The combination of these technologies ensures that the application is interactive, allowing real-time updates and immediate feedback as users input data or formulas.
