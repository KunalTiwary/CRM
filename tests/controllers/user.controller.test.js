const {mockRequest, mockResponse} = require("../interceptor");
const {findAll, findById, update}  = require("../../controllers/user.controller")
const User = require("../../models/user.model");

const userTestPayload = {
    userType: "CUSTOMER",
    password: "123455678",
    name: "Test",
    userId: 1,
    email: "test@relevel.com",
    userStatus: 'APPROVED',
    ticketsCreated: [],
    ticketsAssigned: [],
    exec: jest.fn()
}

describe('Update', () => {
    it('should pass', async() => {
        const userSpy = jest.spyOn(User, 'findOneAndUpdate').mockImplementation(() => ({
            exec: jest.fn().mockReturnValue(userTestPayload)
        }))

        const req = mockRequest();
        const res = mockResponse();
        req.params = {userId: 1};
        req.body = userTestPayload;
        await update(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Updated'
        })
    })
    it('should fail', async() => {
        const userSpy = jest.spyOn(User, 'findOneAndUpdate').mockReturnValue(cb => cb(new Error("This is an error"), null));
        const req = mockRequest();
        const res = mockResponse();
        req.params = {userId: 1};
        await update(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message: 'Internal Server Error'
        })

    })
});


describe('Find By Id', () => {
    
    it("should pass", async () =>{
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.resolve([userTestPayload])); // sending a payload against the find user with id code in actual find by id function
        const req = mockRequest();
        const res = mockResponse();
        req.params = {userId:1};
        await findById(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    userType:"CUSTOMER",
                    name: "Test",
                    userId: 1,
                    email: "test@relevel.com",
                    userStatus: "APPROVED"
                })
            ])
        );
    })

    it("should pass without data", async () =>{
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.resolve(null)); // not sending any payload in that find user function.
        const req = mockRequest();
        const res = mockResponse();
        req.params = {userId:1};
        await findById(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            message: 'User with this Id [1] does not exist.'
        });
    })
})


describe('findAll', () => {

    it('should pass', async() => {
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.resolve([userTestPayload]));
        const req = mockRequest();
        const res = mockResponse();
        req.query = {}
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    email: "test@relevel.com",
                    name: "Test",
                    userId: 1,
                    userStatus: "APPROVED",
                    userType: "CUSTOMER"
                })
            ])
        );
    })

    it('should pass with UserStatus', async() => {
        
    })

    it('should pass with UserType', async() => {
        
    })

    it('should pass with UserType and Status', async() => {
        
    })

    it('should pass with name', async() => {
        
    })

    it("should fail", async () =>{
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.reject(new Error("error")));
        const req = mockRequest();
        const res = mockResponse();
        req.query = {}
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message: "Some internal error occured"
        });
    })
}) 