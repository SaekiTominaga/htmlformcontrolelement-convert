# Converting input value of form control

[![npm version](https://badge.fury.io/js/%40saekitominaga%2Fhtmlformcontrolelement-convert.svg)](https://badge.fury.io/js/%40saekitominaga%2Fhtmlformcontrolelement-convert)

## Demo

- [Demo page](https://saekitominaga.github.io/htmlformcontrolelement-convert/demo.html)

## Examples

```HTML
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

<p><input class="js-convert"/></p>
```

## Constructor

```TypeScript
new FormControlConvert(
  thisElement: HTMLInputElement | HTMLTextAreaElement
)
```

### Parameters

<dl>
<dt><code>thisElement</code> [required]</dt>
<dd>Target element</dd>
</dl>

## Methods

<dl>
<dt><code>convert(options?: convertOptions, table?: convertTable): void</code></dt>
<dd>Perform the conversion</dd>
</dl>

```TypeScript
/* Specify the conversion type */
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

/* Proprietary conversion table (An associative array that specifies the character string before conversion as the key and the character string after conversion as the value) */
interface convertTable {
  [key: string]: string;
}
```