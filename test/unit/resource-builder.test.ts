import express from 'express'
import * as joi from 'joi'
import bodyParser from 'body-parser'
import {createHandler} from "../../src/core/resources/defaultRoute";

import mongoose from 'mongoose'
import {getConfig} from "../../src/_config";
import {getConfigHelper} from "../../src/core/config/helper";
import * as dotenv from "dotenv";
import {getDatabaseConnection} from "../../src/core/database/connect";

const request = require('supertest')

/* Dummy Mongoose Model */
const Schema = mongoose.Schema
const Test = mongoose.model('Test', new Schema({
    name: String
}))


let app

test("Resource Builder Test", async () => {
    // send the request
    let createRes = await request(app).post('/tests').send({ name: 'my test' })
    let id = createRes.body._id
    expect(createRes.statusCode).toBe(200)

    let updateRes = await request(app).put('/tests/'+id).send({ name: 'my tests (updated)'})
    expect(updateRes.statusCode).toBe(200)

    let getRes = await request(app).get('/tests/'+id)
    expect(getRes.body._id).toBe(id)

    let deleteRes = await request(app).delete('/tests/'+id)
    expect(deleteRes.statusCode).toBe(200)

})


beforeEach(async () => {
    // init config
    dotenv.config({ path: ".env" });
    const config = getConfigHelper(getConfig(process.env))
    await getDatabaseConnection({ config })

    // init sample app
    app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    // create a route with a handler function
    app.post('/tests', createHandler({ definition: {
            action: 'create',
            extractBody: 'body',
            model: Test,
            schema: {
                name: joi.string().required()
            }
        }}))

    app.put('/tests/:id', createHandler({
        definition: {
            action: 'update',
            model: Test,
            schema: {
                name: joi.string()
            }
        }}))

    app.delete('/tests/:id', createHandler({
        definition: {
            action: 'delete',
            model: Test,
            schema: {
                name: joi.string()
            }
        }}))

    app.get('/tests/:id', createHandler({
        definition: {
            extractID: 'params.id',
            action: 'get',
            model: Test
        }
    }))
})
