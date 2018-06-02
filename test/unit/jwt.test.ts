import * as dotenv from 'dotenv'
const request = require('supertest')

import {getApp} from "../../src/app";
import {validateJWTMiddleware} from "../../src/lib/jwt/middleware/validate-jwt";
import {getConfig} from "../../src/_config";
import {getConfigHelper} from "../../src/core/config/helper";
import * as fs from "fs";
import {JWTFactory, jwtFactory} from "../../src/lib/jwt/JWTFactory";
import {MissingJWTError} from "../../src/lib/jwt/errors/MissingJWTError";


let app, JWT: JWTFactory


test("JWT Middleware Test", async () => {

    // hit a public route
    await request(app).get('/unsecure')
        .then( res => expect(res.statusCode).toBe(200) )

    // hit a secure route with no token
    await request(app).get('/secure')
        .then( res => expect(res.statusCode).toBe(401) )

    // hit a secure route with a valid token
    await request(app).get('/secure')
        .set('Authorization', 'Bearer '+ JWT.sign({}, '14'))
        .then( res => expect(res.statusCode).toBe(200) )

})


beforeEach(async () => {
    app = await getApp()

    dotenv.config({ path: ".env" })
    const config = getConfigHelper(getConfig(process.env))

    JWT = jwtFactory({
        privateKey: fs.readFileSync(config('jwt.privateKey')),
        publicKey: fs.readFileSync(config('jwt.publicKey'))
    })

    let jwtMiddleware = validateJWTMiddleware({ JWT })

    app.get('/unsecure', (req, res) => res.send('success'))
    app.get('/secure', jwtMiddleware, (req, res) => res.send('success'))

    app.use((err, req, res, next) => {
        if(err instanceof MissingJWTError) {
            return res.status(401).send()
        }
        next()
    })
})