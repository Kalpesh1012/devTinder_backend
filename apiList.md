## authRouter
/signup           - POST
/login            - POST
/logout           - POST
/forgot-password  - POST
/reset-password/:token - POST

## profileRouter
/profile          - GET
/profile          - PATCH
/profile          - DELETE
/profile/:id      - GET

## connectionRouter
/connection/feed                - GET
/connection/swipe/interested/:id - POST
/connection/swipe/ignored/:id    - POST

## requestRouter
/request/received            - GET
/request/sent                - GET
/request/accepted/:requestId - POST
/request/rejected/:requestId - POST

## matchRouter
/matches      - GET
/matches/:id  - DELETE

## safetyRouter
/block/:id   - POST
/block/:id   - DELETE
/report/:id  - POST