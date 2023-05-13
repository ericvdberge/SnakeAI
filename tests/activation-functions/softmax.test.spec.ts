import { it, expect, describe } from "vitest"
import { useActivationFunction } from "../../composables/AI/activationFunction"

describe("softmaxActivation()", () => {
    it("should return correct vector", () => {
        //Arrange
        var { softmaxActivation } = useActivationFunction()
        var input = [1.7026110240214996, -0.3064476733892718, -3.033175855826866, -6.731186990581573] 
        var expected = [0.8748081380586473, 0.11732476915541593, 0.007676914523452885, 0.00019017826248388236]
        
        //Act
        var actual = softmaxActivation(input)
        
        //Assert
        for(let i = 0; i <= actual.length; i++) {
            expect(actual[i]).toBe(expected[i])
        }
    })

    it("sum of vector should be 1", () => {
        //Arrange
        var { softmaxActivation } = useActivationFunction()
        var input = [1.7026110240214996, -0.3064476733892718, -3.033175855826866, -6.731186990581573]
        
        //Act
        var actual = softmaxActivation(input)
        var sumActual = actual.reduce((x, y) => x + y, 0)

        //Assert
        expect(sumActual).toBe(1)
    })
})

