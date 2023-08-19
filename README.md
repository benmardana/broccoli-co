# broccoli-co

A better way to enjoy every day

## Requirements

- node 16+

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Deployment

```bash
npm run build
# serve with your choice of web server
# locally preview the build with npm run preview
```

## Tests

Tests are written with vitest and react testing library

```bash
npm test
```

## Notes

### Dialog

The dialog will retain state between showings. E.g. form state and submission result.
This wasn't defined in the instructions - this is the out of the box behaviour. State reset can be achieved by adding an onClose handler to the dialog.

I've chosen to use the native html dialog as it gives good accessibility out of the box and doesn't require much js to control interactions. Regarding the tests, React Testing Library doesn't fully support the dialog element yet so querying for it requires a `{ hidden: true }` option. Testing its visibility is done by looking for the `open` attribute on the element, instead of `isVisible()`.
