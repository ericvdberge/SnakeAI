import { it, expect, describe } from "vitest"
import { useActivationFunction } from "../../composables/AI/activationFunction"

describe("steppingActivation()", () => {
    it("should return correct vector", () => {
        //Arrange
        var { steppingActivation } = useActivationFunction()
        var input = [0 , -3, 12, 888]
        var expected = [0, 0, 1, 1]
        
        //Act
        var actual = steppingActivation(input)
        
        //Assert
        for(let i = 0; i <= actual.length; i++) {
            expect(actual[i]).toBe(expected[i])
        }
    })
})

