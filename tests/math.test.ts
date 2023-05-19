import { it, expect, describe } from "vitest"
import { useMath }  from "../composables/AI/math"

describe("math", () => {
    it("multiply should work", () => {
        //Arrange
        const { multiply } = useMath()
        const x = [
            [0,1,2],
            [0,1,2],
            [0,1,2]
        ]
        const y = [
            [0,1,2],
            [0,1,2],
            [0,1,2]
        ]

        //Act
        const res: number[][] = multiply(x, y)
        const expected = [
            [0, 3, 6],
            [0, 3, 6],
            [0, 3, 6]
        ]

        //Assert
        for(let i = 0; i < res.length; i++) {
            for(let j = 0; j < res[i].length; j++) {
                expect(res[i][j]).toBe(expected[i][j])
            }
        }
    })

    it("dot product should work", () => {
        //Arrange
        const { dot } = useMath()
        const x = [1,2,3]
        const y = [1,2,3]

        //Act
        const res: number = dot(x, y)
        
        //Assert
        expect(res).toBe(14)
    })
})
