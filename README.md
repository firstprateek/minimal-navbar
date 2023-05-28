# minimal-navbar

A simple yet powerful Navigation Bar web-component that can be added to your website to navigate between web pages.

The widget is:

1. Responsive - You can set a width in pixels using the breakpoint property. When the viewport width is below the breakpoint, the navbar changes to a mobile version.
2. Themable - You can use css variables to set the theme colors for the widget. See the list of css variables below.
3. Light-weight and Performant - Built using the [LIT](https://lit.dev/) framework.

## Live Demo

[Demo](https://firstprateek.github.io/minimal-navbar/)

## Installation

```bash
npm install minimal-navbar --save
```

## Usage

```js
// In index.js
import MinimalNavbar from 'minimal-navbar';
```

```jsx
<!DOCTYPE html>
<head>
    <script src="./index.js"></script>
</head>
<body>
    <minimal-navbar></minimal-navbar>
</body>
</html>
```

```js
/**
 * @property breakpoint {Number} - The width in pixels below which the Navbar displays in mobile mode.
 *
 * @slot brand - A link to the brand of the website
 * @slot link - Navigation links
 *  
 * @fires activeLinkChanged - Fired when a link is selected
 *
 * @cssproperty --hamburger-stripe-color - Color of the stripes in the hamburger menu
 * @cssproperty --navbar-shadow - Box shadow for the Navbar, default: 0 1px 2px rgb(0 0 0 / 50%)
 * @cssproperty --navbar-height - Height of the Navbar, default: 75px
 * @cssproperty --navbar-font-size - Font size of the Navbar, default: 16px
 * @cssproperty --navbar-font-family - Font family of the Navbar, default: "Exo 2", sans-serif
 * @cssproperty --navbar-bg-color - Background color of the Navbar, default: #FFFFFF
 * @cssproperty --navbar-menu-color - Background color of the links, default: #FFFFFF
 * @cssproperty --navbar-link-color - Color of the links, default: #58595B
 * @cssproperty --navbar-highlight-color - Color of the title and links, default: #E65446
 * @cssproperty --navbar-link-active-color - Color of the links, default: #333333
 */
```
