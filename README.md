# hamburger-btn

A webcomponent for a hamburger menu button developed using [LIT](https://lit.dev/)

## Live Demo

[Demo](https://firstprateek.github.io/hamburger-btn/)

## Installation

```bash
npm install hamburger-btn --save
```

## Usage

```js
// In index.js
import HamburgerBtn from 'hamburger-btn';
```

```jsx
<!DOCTYPE html>
<head>
    <script src="./index.js"></script>
</head>
<body>
    <main>
        <hamburger-btn></hamburger-btn>
    </main>
</body>
</html>
```

```js
/**
 * HamburgerButton widget: <hamburger-btn></hamburger-btn>.
 * 
 * This widget is a hamburger button that changes into a cross button upon click.
 * 
 * @property hidden {Boolean}. If false then button is hidden.
 * @property open {Boolean}. If true then the stripes change into a cross.
 * 
 * @fires click - Indicates when the button is clicked. The open property is toggled when button is clicked.
 * 
 * @cssproperty --hamburger-stripe-color - This variable controls the color of the stripes
 */
```
