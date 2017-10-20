### Web Components Practice

Implement a wrapper for `select` element, which styles chosen option.

#### Code template

```html
<my-select>
    <select></select>

    <template>
        <slot name=value>
            Please select whatever
        </slot>

        <div class=arrow></div>
    </template>
</my-select>
```