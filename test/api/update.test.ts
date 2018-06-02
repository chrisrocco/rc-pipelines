import {getApp} from "../../src/app";

const request = require('supertest')


let userModel = {
    name: 'Chris Rocco',
    email: 'croasdfasfcco@gmail.com',
    password: 'secret'
}

test("Local Auth Routes", async () => {
    let app = await getApp()

    // REGISTER
    let registerResponse = await request(app).post('/register').send(userModel)
    if(registerResponse.statusCode === 409) registerResponse.statusCode = 200
    expect(registerResponse.statusCode).toBe(200)

    // LOGIN
    let loginRes = await request(app).post('/login').send({ email: userModel.email, password: userModel.password })
    expect(loginRes.statusCode).toBe(200)


    let jwt = loginRes.body.token
    let user = loginRes.body.user

    // UPDATE PROFILE
    let updateRes = await request(app)
        .put('/users/'+user._id)
        .set({ 'Authorization': 'Bearer ' + jwt })
        .send({ name: "Christopher" })
    expect(updateRes.statusCode).toBe(200)
    expect(updateRes.body.name).toBe("Christopher")

})