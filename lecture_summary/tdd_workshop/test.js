"use strict"
const calc = require(".")

describe("calc.sum", () => {
  it("is a function", () => {
    calc.should.respondTo("sum")
  })

  const {sum} = calc

  describe("returns sum", () => {
    it("empty string", () => {
      sum("").should.equal(0)
    })

    it("one number", () => {
      sum("10").should.equal(10)
      sum("0.").should.equal(0)
      sum(".0").should.equal(0)
      sum("1e3").should.equal(1e3)
      sum("1E-3").should.equal(1E-3)
      sum("2").should.equal(2)
      sum("1.2").should.equal(1.2)
      sum("0xff").should.equal(255)
      sum("0o666").should.equal(0o666)
      sum("0B10101").should.equal(0B10101)
    })

    it("two numbers", () => {
      sum("1,2").should.equal(3)
      sum("4,8.5").should.equal(12.5)
      sum("1e3,0xf").should.equal(1015)
    })

    it("multiple numbers", () => {
      sum("1,2,3").should.equal(6)
      sum("1.5,2,0.5").should.equal(4)
      sum("0xf,0o6,1").should.equal(22)
    })
  })

  describe("delimiters", () => {
    it("\\n", () => {
      sum("1\n2,3").should.equal(6)
      sum("10\n2\n1,3.5").should.equal(16.5)
      sum("1e3\n0b1010101,2.5").should.equal(1087.5)
    })

    describe("custom", () => {
      it("single char", () => {
        sum("//;\n1,2;3\n4").should.equal(10)
        sum("//[\n1\n2[3,4").should.equal(10)
        sum("//]\n1]2,3\n4").should.equal(10)
      })

      it("multi char", () => {
        sum("//[**]\n1**2**3,4\n5").should.equal(15)
        sum("//[*]\n1,2*3*4\n5").should.equal(15)
      })

      it("multiple", () => {
        sum("//[!][**][&]\n1!2**3&4,5\n6").should.equal(21)
      })

      it("escapes RegExp meta chars", () => {
        sum("//.\n1,2.3\n4").should.equal(10)
      })

      it("handles unicode symbols", () => {
        sum("//🤘\n1🤘2,3🤘4").should.equal(10)
      })
    })
  })

  describe("throws on negatives", () => {
    it("one", () => {
      ;(() => sum("1,-1")).should.throw(RangeError, "negatives not allowed: -1")
    })

    it("multiple", () => {
      ;(() => sum("1,-1,-2")).should.throw(RangeError, "negatives not allowed: -1,-2")
      ;(() => sum("1,-1,-2,-3")).should.throw(RangeError, "negatives not allowed: -1,-2,-3")
    })
  })

  it("big numbers are ignored", () => {
    sum("1e3,2").should.equal(1002)
    sum("1001,2").should.equal(2)
  })
})