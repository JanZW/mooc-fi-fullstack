# CSS review

https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content

CSS = Cascading Style Sheets

## Example

HTML
```html
<p>Instructions for life:</p>

<ul>
  <li>Eat</li>
  <li>Sleep</li>
  <li>Repeat</li>
</ul>
```

```css
p {
  font-family: sans-serif;
  color: red;
}

li {
  background-color: greenyellow;
  border: 1px solid black;
  margin-bottom: 5px;
}
```
Each section in the css code controls the formatting of the corresponding elements.

### Directory Structure

```bash
.
├── index.html
└── styles
    └── styles.css
```

To apply the css to the html document, include the following line in the `<head></head>` section:
```html
<head>
    <link href="styles/styles.css" rel="stylesheet">
    ...
</head>
```

## CSS Syntax
In the above example, `p` is called a selector - it selects the element(s) to style. The curly braces contain **declarations**. A declaration consists of a **property** (e.g. `color`) and **property values** (e.g. `red`).

The whole structure is called a **ruleset**. Within a ruleset, declarations have to be separated by semicolons and separate the property from the property values with a colon.

It is possilbe to include multiple selectors in one rule, separated by commas to apply the rule to multiple elements.

```css
p,
.my-class,
#my-id {
    color: red;
}
```

This example encludes an **element** (or **type**) selector, which selects a specific HTML element as well as two other selector types.

## Improving the text
In order to change/improve the font of the text, select a font from https://fonts.google.com/, where you can get the embed code snippet:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
```
which you include in the `<head></head>` section of your html document.

Set the `font-family` property in the html element to the appropriate font family.
All elements that are lower in the structural hirarchy will inherit this property unless overridden.

## The Box Model

Many things in css are about boxes. Most HTML elements on a page can be thought of as boxes that sit on top of (or alongside) other boxes. You can set values on these boxes for size, color, positioning, etc.

Each box that takes up space on your page has properties like:
- `padding`: the space around the content.
- `border`: The solid line just outside the padding.
- `margin`: The space outside the border.

Some possible properties are
- `width`
- `background-color`
- `color`
- `text-shadow`: A drop shadow on the text inside an element
- `display`: The display mode of an element (which basically refers to how it appears or is laid out on the web page).

## Block vs Inline Elements
The `<body>` element is a block element, meaning it takes up space on the page and can accept margin,, padding and other box properties. 
`<img>` elements, on the other hand, are inline elements: by default, they don't accept margin values in the same way block elements do. For the auto-margin trick (i.e. setting the horizontal margin to auto, see styles.css) to work on this image, we must give it block-level behaviour by using `diplay: block;`. 