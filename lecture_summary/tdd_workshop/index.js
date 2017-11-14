"use strict"
const escapeMeta = str => str.replace(/[|{}[\]()?+*.\\$^]/g, "\\$&")
const sum = (acc, num) => acc + num
const customDel = /^\/\/(.+)\n/
const anyLenDel = /(?<=\[)(.+?)(?=\])/g

exports.sum = str => {
  let dels = [",", "\n"]

  str =
  str.replace(customDel, (_, del) => {
    let many = del.match(anyLenDel)
    if (many) dels.push(...many)
    else dels.push(del)

    return ""
  })

  let sep = new RegExp(dels.map(escapeMeta).join("|"))
  let nums = str.split(sep).map(Number)
  let negs = nums.filter(num => num < 0)

  if (negs.length)
    throw new RangeError(`negatives not allowed: ${negs}`)

  return nums
    .filter(num => num <= 1000)
    .reduce(sum)
}