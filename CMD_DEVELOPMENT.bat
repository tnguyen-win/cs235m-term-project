@ECHO OFF

ECHO ----
ECHO 0 - [ start ]
ECHO 1 - [ web ]
ECHO 2 - [ android (emulator) ]
ECHO 3 - [ android (device) ]
ECHO 4 - [ ios (emulator) ]
ECHO 5 - [ ios (device) ]
ECHO 6 - [ lint ]
ECHO 7 - [ update dependencies ]
ECHO ----

SET /P input="ENTER: "

IF %input% == 0 (
    CALL npm run start
)

IF %input% == 1 (
    CALL npm run web
)

IF %input% == 2 (
    CALL npm run android-emulator
)

IF %input% == 3 (
    CALL npm run android-device
)

IF %input% == 4 (
    CALL npm run ios-emulator
)

IF %input% == 5 (
    CALL npm run ios-device
)

IF %input% == 6 (
    CALL npm run lint
)

IF %input% == 7 (
    CALL npm run update-dependencies
)

ECHO ----
ECHO FINISHED

PAUSE