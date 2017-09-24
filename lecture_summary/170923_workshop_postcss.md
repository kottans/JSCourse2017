### Result code by @shvaikalesh 

```js
'use strict'
const postcss = require('postcss')
const selectorParser = require('postcss-selector-parser')

let index = 0

const plugin = postcss.plugin('postcss-autofill', () => {
    return root => root.walkRules(rule => {
        let {res} = selectorParser(sel => {
            sel.walkPseudos(pseudo => {
                if (pseudo.value == ':autofill')
                    pseudo.value = ':-webkit-autofill'
            })
        }).process(rule.selector)

        res += ''
        if (res == rule.selector) return

        let params = `postcss-autofill-${++index}`
        let keyframes = postcss.atRule({
            name: 'keyframes', params
        })

        let to = postcss.rule({
            selector: 'to'
        })

        let decls = rule.nodes
            .filter(node => node.type == 'decl')

        to.append(...decls)

        root.prepend(keyframes)
        rule.selector = res

        keyframes.append(to)
        keyframes.source = rule.source

        rule.append({
            type: 'decl',
            prop: 'animation',
            value: `${params} 1s forwards`,
        })
    })
})

postcss([plugin]).process(`
input:autofill {
    color: red !important;
}
`).then(res => console.log(res.css))
```