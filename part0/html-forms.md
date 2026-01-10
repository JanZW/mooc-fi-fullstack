# Web Forms

## What are web forms?

Forms allow users to enter data, which is generally sent to a web server for processing and storage, or used on the client-side to immediately update the interface in some way.

A web form's HTML is made up of one or more **form controls** (sometimes called widgets), plus some additional elements to help structure the overall form - they are often referred to as HTML forms. The controls can be single or multi-line text fields, dropdown boxes, buttons, checkboxes, or radio buttons, and are mostrly created using the `<input>` element.

Form controls can also be programmed to enforce specific formats or values to be entered (**form validation**), and paired with text labels that describe their purpose to both sighted and visually impaired users.

## Designing your form

Remember: The bigger your form, the more you risk frustrating peorple and losing users. Keep it simple and stay focused: ask only for the data you absolutely need.

## Implementing our form HTML

Use the following elements:
- `<form>`
- `<label>`
- `<input>`
- `<textarea>`
- `<button>`

Start with the `<form>` element. It is a container element like a `<section>` or `<footer>`.
All of its attributes are optional, but it's standard practice to always set at least the `action` and the `method` attributes.
- The `action`attribute defines the location (URL) where the form's collected data should be sent when it is submitted.
- The `method` attribute defines which HTTP method to send the data with (usually `get` or `post`)

The contact form is supposed to contain three text fields, each with a corresponding `<label>`:
- The input field for the name is a *single-line text field*
- The input filed for the email is a *input of type email*: A sinle-line text field that accepts only email addresses.
- The input field for the message is a `<textarea>`; a multiline text field.

In order to associate the label with the corresponding element, set the `for` attribute of the label to the `id` attribute of the form control.

Use the `<button>` element with `type="submit"`. Possible values for type are `submit`, `reset`, or `button`.

- A click on a `submit` button (the default value) sends the form's data to the web page defined by the action attribute of the `<form>` element.
- A click on a `reset` button resets all the form widgets to their default value immediately. From a UX pont of view, this is considered bad practice, so you should avoid using this type of button unless you 
really have a good reason to include one.
- A click on a `button` button does *nothing*!. That is useful for building custom buttons.

## Form Styling

see form-website/styles/styles.css
