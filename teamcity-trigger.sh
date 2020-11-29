SERVER=http://206.189.184.229:8111
ACCESS_TOKEN="eyJ0eXAiOiAiVENWMiJ9.WXptRlFmdXowcG42Y0F2eGI1NVZVSGVEZ25Z.MTk5MWE3ZDYtYTBjNS00YjY2LWE5NTMtM2ZhODBhNTQzZmE1"

LOCATOR=$1

# The following is one-line:
(sleep 10;  curl --header "Authorization: Bearer $ACCESS_TOKEN" -X POST "$SERVER/app/rest/vcs-root-instances/commitHookNotification?locator=$LOCATOR" -o /dev/null) >/dev/null 2>&1 <&1 &

exit 0
