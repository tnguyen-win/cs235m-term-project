@ECHO OFF

ECHO ----
ECHO 0 - [ start (global) ]
ECHO 1 - [ start (local) ]
ECHO 2 - [ web ]
ECHO 3 - [ android (emulator) ]
ECHO 4 - [ android (device) ]
ECHO 5 - [ ios (emulator) ]
ECHO 6 - [ ios (device) ]
ECHO 7 - [ lint ]
ECHO 8 - [ update dependencies ]
ECHO ----

SET /P input="ENTER: "

IF %input% == 0 (
    CALL npm run start-global
)

IF %input% == 1 (
    CALL npm run start-local
)

IF %input% == 2 (
    CALL npm run web
)

IF %input% == 3 (
    CALL npm run android-emulator
)

IF %input% == 4 (
    CALL npm run android-device
)

IF %input% == 5 (
    CALL npm run ios-emulator
)

IF %input% == 6 (
    CALL npm run ios-device
)

IF %input% == 7 (
    CALL npm run lint
)

IF %input% == 8 (
    CALL npm run update-dependencies
)

ECHO ----
ECHO FINISHED

PAUSE