import { it, expect, describe } from "vitest"
import { useActivationFunction } from "../../composables/AI/activationFunction"

describe("reluActivation()", () => {
    it("should return correct vector", () => {
        //Arrange
        const { reluActivation } = useActivationFunction()
        const input = [0, 5, -22, 3]
        const expected = [0, 5, 0, 3]
        
        //Act
        var actual = reluActivation().forward(input)
        
        //Assert
        for(let i = 0; i <= actual.length; i++) {
            expect(actual[i]).toBe(expected[i])
        }
    })
})

