const rewire = require("rewire")
const index = rewire("./index")
const sortByNameAndLabel = index.__get__("sortByNameAndLabel")
// @ponicode
describe("index", () => {
    test("0", () => {
        let param1 = [["user_name", "user-name", "user name"], [123, "user-name", "user123"], [123, "user name", "user123"]]
        let callFunction = () => {
            index(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param1 = [[123, 123, "user name"], ["user name", "user name", "user_name"], ["user name", "user name", "user name"]]
        let callFunction = () => {
            index(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param1 = [["user-name", "user_name", "user-name"], ["user123", "user123", "user123"], ["user name", "user name", "user_name"]]
        let callFunction = () => {
            index(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param1 = [["user_name", "username", "user_name"], [123, 123, "username"], ["username", 123, 123]]
        let callFunction = () => {
            index(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param1 = [["user-name", "user name", "user123"], ["username", "user123", 123], ["username", "user-name", "user123"]]
        let callFunction = () => {
            index(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            index(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("sortByNameAndLabel", () => {
    test("0", () => {
        let callFunction = () => {
            sortByNameAndLabel("user_name", [-100, 0, 0])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            sortByNameAndLabel("user name", [-5.48, 1, 100])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            sortByNameAndLabel(123, [0, 1, -100])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            sortByNameAndLabel("username", [-5.48, 0, -5.48])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            sortByNameAndLabel("user_name", [-100, 0, -5.48])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            sortByNameAndLabel(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
