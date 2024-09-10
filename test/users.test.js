import { UserDao } from "../src/dao/factory";
import chai from "chai";
import supertest from "supertest";
import Asserts from 'assert'
import { objConfig } from "../src/config";
import { isReadable } from "stream";

const assert = Asserts.strict
const expect = chai.expect
const requester = supertest(`http://localhost:${objConfig.port}/`)
describe('UserDao', () => {
    before(function () {
        this.usrdao = new UserDao()
    })
    beforeEach(function () {
        this.timeout(5000)
    })

    it('Should return all users in array format', async function () {
        const users = await this.usrdao.getAll()
        assert.ok(Array.isArray(users))
        assert.ok(users.length > 0)
    })
})

describe('testing of routes (users)',()=>{
    describe('Testing user dao',()=>{
        it('Route api/sessions/register should register an user', async ()=>{
            const usermock = {
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@example.com',
                age: 24,
                password: '123456',
                role: 'admin',
                document: [{name: 'Test',reference:'usrdoctest.pdf'}] 
            }
            const{
                statusCode,
                ok,
                _body
            } = await requester.post('api/sessions/register').send(usermock)
            expect(_body.payload).to.be.ok
            expect(statusCode).to.equal(200)
            expect(ok).to.be.true
        })

        it('Route api/sessions/login should authenticate an user', async ()=>{
            const usermock = {
                email: 'johndoe@example.com',
                password: '123456',
            }
            const result = await requester.post('api/sessions/login').send(usermock)
            const cookieResult = result.headers['set-cookie'][0]
            expect(cookieResult).to.be.ok
                cookie ={
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1],
            }
            expect(cookie.name).to.be.ok.and.equal('token')
            expect(cookie.value).to.be.ok
        })
    })
})