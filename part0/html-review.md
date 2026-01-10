# HTML Review

https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content

## Example
```html
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>My test page</title>
  </head>
  <body>
    <img src="" alt="My test image" />
  </body>
</html>
```

Elements:
- `<!doctype html>`: required preamble marking that the document adheres to the HTML format.
- `<html></html>`: wraps the content of the entire page; aka root element. The `lang` attribute sets the primary language of the document.
- `<head></head>`: container for all the stuff you want to incllude on the HTML page that *isn't* the content you are showing to your page's viewers. (E.g. keywords, page description, css, charset, whether you want to appear in searches,...)
- `<meta charset="utf-8">`: Set character set for this document to UTF-8.
- `<meat name="viewport" content="width=device-width">`: This viewport element ensures the page renders at the width of the browser viewport, preventing mobile browsers from rendering pages wider than the viewport and then shrinking them down.
- `<title></title>`: Title of the page that appears in the browser tab, also used to describe the page when bookmarking.
- `<body></body>`: contains all content that you want to show to web users.

- `<img>`: embed the image
    - `src`: location of the image file
    - `alt`: alternative description (for visual impairment, or in case the image cannot be displayed)

## Markup Text
### Headings
```html
<!-- 4 heading levels: -->
<h1>My main title</h1>
<h2>My top level heading</h2>
<h3>My subheading</h3>
<h4>My sub-subheading</h4>
```
### Paragraphs
```html
<p>This is a single paragraph</p>
```

### Lists
Lists can either be ordered (`<ol></ol>`) or unordered (`<ul></ul>`).
Each item in the lists is put inside a list item `<li></li>`.

### Links
Use the `<a></a>` (anchor) element for linking. Include the text you want to display in the anchor element and use the `href` attribute for the destination (including the protocol, i.e. `http://` or `https://`).