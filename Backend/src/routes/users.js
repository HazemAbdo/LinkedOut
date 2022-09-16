let express = require("express");
let router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/auth");

/**
 * @api {get} /users/:id Get user by id
 * @apiName GetUserDetailsById
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiParam {String} id User id as url parameter
 * @apiSuccess {Number} status_code Status code of the response
 * @apiSuccess {Object} data User object
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *   {
 *  "status_code": 200,
    "data": {
       "_id": "6320f8124f2090aa8f72a32c",
        "email": "ha4450770@gmail.com",
        "username": "Hazem Abdo",
        "websites": [],
        "country": "egypt",
        "city": "giza",
        "current_position": "student",
        "skills": [],
        "experience": [
            {
                "skills": [],
                "_id": "6323bf4de5c0bd6dcd0f9d0a",
                "profile_headline": "Computer Engineering Student",
                "media": []
            }
        ],
        "education": [
            {
                "school_name": "Cairo University",
                "degree": "Bachelor's degree",
                "field_of_study": "Computer Engineering",
                "start_date": "2018-09-30T22:00:00.000Z",
                "end_date": "2023-06-30T22:00:00.000Z",
                "activities_and_societies": [],
                "_id": "6320f8124f2090aa8f72a32d",
                "media": []
            }
        ],
        "connections": [
            {
                "user_id": "6320f80e4f2090aa8f72a32a",
                "connection_status": "ACCEPTED",
                "_id": "6321c63580e64d5d76594e90"
            },
            {
                "user_id": "632239eef0473a60e78a300a",
                "connection_status": "PENDING",
                "_id": "63228bd16d58a248a9c4baa3"
            }
        ],
        "languages": [{
            "lang": "arabic",
            "level": "native",
        }],
        "projects": [
        {
            "project_name": "project1",
            "project_description": "project1 description",
            "project_link": "http://project1.com",
            "currently_working": false,
            "project_start_date": "2020-09-30T22:00:00.000Z",
            "project_end_date": "2020-10-30T22:00:00.000Z",
            "creators": [
                "6320f8124f2090aa8f72a32c"
            ],
            "asscoiated_with": "Cairo University",
            "asscoiated_skills": [
                "javascript",
                "python"
            ],
        }
        ],
        "certificates": [
            {
                "certificate_name": "certificate1",
                "certificate_url": "http://certificate1.com",
                "organization": "Cairo University",
                "issue_date": "2020-09-30T22:00:00.000Z",
                "expired": false,
                "expiration_date": "2020-10-30T22:00:00.000Z",
                "credential_id": "credential1",
            }
        ],
        "__v": 0
    }
}
 */
router.get("/:id", userController.getUser);

router.get("/", userController.getUsers);

/**
 * @api {post} /users Register new user
 * @apiName RegisterUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiBody {String} email User email
 * @apiBody {String} password User password
 * @apiBody {String} username User username
 * @apiBody {String} country User country
 * @apiBody {String} city User city
 * @apiBody {String} current_position User current_position
 * @apiSuccess {Number} status_code Status code of the response
 * @apiSuccess {Object} data User object
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 201 OK
 *  {
        "status_code": 201,
        "data": {
            "_id": "6323c36b26a9a64b6a0ae72c",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvbmRvZTJAZ21haWwuY29tIiwiaWF0IjoxNjYzMjg4MTcxLCJleHAiOjE2NjMyOTE3NzF9.jQORiYgS9ffuxQSNObVE4r4In9Qgd3fV00pZq0ATq80"
        }
    }
 *
 */
router.post("/", userController.createUser);

/**
 * @api {post} /users/login Login user
 * @apiName LoginUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiBody {String} email User email
 * @apiBody {String} password User password
 * @apiSuccess {Number} status_code Status code of the response
 * @apiSuccess {Object} data User object
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {
        "status_code": 200,
        "data": {
            "_id": "632239eef0473a60e78a300a",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzIyMzllZWYwNDczYTYwZTc4YTMwMGEiLCJlbWFpbCI6ImpvbmRvZUBnbWFpbC5jb20iLCJpYXQiOjE2NjMyODgzMDAsImV4cCI6MTY2MzI5MTkwMH0.-GXglJ1wRZegmHDhwBxNH4USbjz4rmSkYbARJnEn5NE"
        }
    }
 */
router.post("/login", userController.loginUser);

/**
 * @api {post} /users/logout Logout user
 * @apiName LogoutUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiHeader {String} Authorization  Bearer token
 * @apiSuccess {Number} status_code Status code of the response
 * @apiSuccess {Object} message User object
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
        "status_code": 200,
        "data": {
            "message": "Logged out successfully"
        }
    }
 */
router.post("/logout", verifyToken, userController.logout);

module.exports = router;
