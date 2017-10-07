### Code

```js
function SubArray(len) {
    return Reflect.construct(
        Array, [len], SubArray
    )
}

SubArray.prototype = Object.create(
    Array.prototype
)

Object.defineProperties(SubArray.prototype, {
    constructor: {
        value: SubArray,
        writable: true,
        configurable: true,
    },
    last: {
        get() {
            return this[this.length - 1]
        },
        configurable: true,
    },
})

let arr = new SubArray(3)
```

### Links

[Raymond Hettinger - Beyond PEP 8 -- Best practices for beautiful intelligible code](https://www.youtube.com/watch?v=wf-BqAjZb8M)

[The history of “typeof null”](http://2ality.com/2013/10/typeof-null.html)

[[[Construct]]: extends the check against non-undefined primitive](https://github.com/tc39/ecma262/pull/469)

[Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle)

[The structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)