# Converting input value of form control

[![npm version](https://badge.fury.io/js/%40saekitominaga%2Fhtmlformcontrolelement-convert.svg)](https://badge.fury.io/js/%40saekitominaga%2Fhtmlformcontrolelement-convert)

## Demo

- [Demo page](https://saekitominaga.github.io/htmlformcontrolelement-convert/demo.html)

## Examples

```
<script type="module">
import FormControlConvert from './dist/FormControlConvert.js';

for (const formControlElement of document.querySelectorAll('.js-convert')) {
  const formControlConvert = new FormControlConvert(formControlElement);
  formControlConvert.convert({
    trim: true,
    noBlankLine: true,
    toHankakuEisu: true,
  }, {
    '．': '.'
  });
}
</script>
```

## Constructor

```
new FormControlConvert(
  thisElement: HTMLInputElement | HTMLTextAreaElement
)
```

### Parameters

<dl>
<dt>thisElement [required]</dt>
<dd>Target element</dd>
</dl>

## Methods

| Name | Returns | Description |
|-|-|-|
| convert(options?: convertOptions, table?: convertTable) | {void} | Perform the conversion |

```
interface convertOptions {
  trim?: boolean; // Remove whitespace at both ends
  noBlankLine?: boolean; // Delete blank lines
  toHankakuEisu?: boolean; // Make alphanumeric characters half-width (Only one of `toHankakuEisu` and toZenkakuEisu` can be specified)
  toZenkakuEisu?: boolean; // Make alphanumeric characters full-width (Only one of `toHankakuEisu` and toZenkakuEisu` can be specified)
  toHankakuSpace?: boolean; // Make full-width space half-width
  combineSpace?: boolean; // Consolidate contiguous spaces
  toLowerCase?: boolean; // Make the alphabet lowercase (Only one of `toLowerCase` and `toUpperCase` can be specified)
  toUpperCase?: boolean; // Make the alphabet uppercase (Only one of `toLowerCase` and `toUpperCase` can be specified)
}

interface convertTable {
  [key: string]: string;
}
```