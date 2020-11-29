#!/usr/bin/env bash
SERVER=http://206.189.184.229:8111/
ACCESS_TOKEN="eyJ0eXAiOiAiVENWMiJ9.VEpZNlZKMGxSamZaejVET2Rkb0k5akNoVV9z.OWNkMzIwN2MtODhhZi00ZjQ4LThmZmEtMmI0Mzc2YTg4ZTA3"

LOCATOR=$1

# The following is one-line:
(sleep 10;  curl --header "Authorization: Bearer $ACCESS_TOKEN" -X POST "$SERVER/app/rest/vcs-root-instances/commitHookNotification?locator=$LOCATOR" -o /dev/null) >/dev/null 2>&1 <&1 &

exit 0
