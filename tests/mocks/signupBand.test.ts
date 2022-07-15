import { BandBusiness } from "../../src/business/BandBusiness"
import { IdGenerator } from "../../src/services/IdGenerator"

test("Testing valid band creation, with invalid credentials (NORMAL)", () => {

  const mockNormalCredential = jest.fn( () => {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzNzM5YzU4LTBjYjktNGIzYi1iYzRlLWJkNmQ1MWRlMDE2ZiIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2NTc5MTE3ODcsImV4cCI6MTY1ODA4NDU4N30.VdmUn7vc-Zq9GNLPLOkD22U_VM3VOFQDqNUpcu0Onbo"
  })

  

  let bandDataBaseMock = jest.fn( () => {
    return "Band succesfully created!"
  })

  let UserDatabaseMock = jest.fn( () => {
    return true; 
  })

    let bandBusinessTest = new BandBusiness(new IdGenerator(),bandDataBaseMock, UserDatabaseMock); 
})