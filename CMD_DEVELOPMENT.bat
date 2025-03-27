@ECHO OFF

ECHO ----
ECHO 0 - [ start ]
ECHO 1 - [ web ]
ECHO 2 - [ android ]
ECHO 3 - [ ios ]
ECHO 4 - [ lint ]
ECHO 5 - [ update dependencies ]
ECHO ----

SET /P input="ENTER: "

IF %input% == 0 (
    CALL npm run start
)

IF %input% == 1 (
    CALL npm run web
)

IF %input% == 2 (
    CALL npm run android
)

IF %input% == 3 (
    CALL npm run ios
)

IF %input% == 4 (
    CALL npm run lint
)

IF %input% == 5 (
    CALL npm run update-dependencies
)

ECHO ----
ECHO FINISHED

PAUSE