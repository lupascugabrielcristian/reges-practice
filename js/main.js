// AUTHENTICATE
document.getElementById('authenticateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;
    const resultDiv = document.getElementById('result-auth');
    
    try {
        const response = await fetch('api/authenticate.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, password })
        });
        
        const data = response;
        const dataJson = await response.json();

        
        if (!dataJson) {
          resultDiv.innerHTML = `Server errr: $response`;
        } 
        else {
          resultDiv.innerHTML = `${JSON.parse(dataJson)["access_token"]}`;
        }
        
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});

// PROFILE
const myAuthToken = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ0QWZKOTk2XzhaZkUzVVczSHpBcGgzbjRaREVLcDdyaWE0SlVHLWNoN2FnIn0.eyJleHAiOjE3NTczNDIwMDksImlhdCI6MTc1NzM0MDIwOSwianRpIjoiOTkwNGJmZWMtMDA2YS00Nzg0LThlNzgtY2Q4ODg0OGY1YjJkIiwiaXNzIjoiaHR0cHM6Ly9zc28uZGV2Lmluc3BlY3RpYW11bmNpaS5vcmcvcmVhbG1zL0FQSSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIxOGJlNTE1Yi1hNjdmLTQ2NjAtYjZlYS1mNjM0OWJjMThiMjciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZWdlcy1hcGkiLCJzaWQiOiJhNjQ5NzQxYS0xYmExLTQyZTEtOThiNi00MzQ2OWRhZjM0OWYiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtYXBpIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkNSSVNUSUFOIExVUEFTQ1UgQklOQVJZIEZVU0lPTiBTLlIuTC4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiIyMzJmN2RmYy0wYzM2LTRjMjMtYWVhNy0yNzE0MTUzNzJjZGUiLCJnaXZlbl9uYW1lIjoiQ1JJU1RJQU4gTFVQQVNDVSIsImF1dGhvcklkIjoiMjMyZjdkZmMtMGMzNi00YzIzLWFlYTctMjcxNDE1MzcyY2RlIiwiZmFtaWx5X25hbWUiOiJCSU5BUlkgRlVTSU9OIFMuUi5MLiIsImVtYWlsIjoiMjMyZjdkZmMtMGMzNi00YzIzLWFlYTctMjcxNDE1MzcyY2RlQGluc3BlY3RpYW11bmNpaS5ybyJ9.M2zKrQ4rnTxKip-VESMxA__4gTjtUQSr_xiSNMsrDyDzLLPYn02YH3v13GUNH-z8wF-PIcMCjJbiFQGPu0dvkzb5M43X6Tadeodig8e-sQf8Ds5tuyGcSJLWv3a3cGTJv-f1ePN8G7LzdODqfC0J08e6BWGvA-VV-EckQ6utQMHZPVn_V61yKJDWYwG82G5hAkVs4yZhyb4qNPA0fDBiCQTjlZyY4QeS4Dg2KuynrAFcPVwPkie52YUWkOddX8F_yWT_tDTsScTGMPMD0a08eBGSAgkVTLXXOd7guNC33a2pzlrb3rdBqcR2tizuA3wb7fdLUcVc8ReHH-y9M5ibNQ
`
document.getElementById('result-auth').textContent = myAuthToken;
document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const authToken = document.getElementById('result-auth').textContent
    const resultDiv = document.getElementById('result-profile');

    try {
        const response = await fetch('api/profile.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ authToken })
        });
        
        const data = response;
        const dataJson = await response.clone().json();
        const dataText = await response.text();

        
        if (!dataJson) {
            resultDiv.innerHTML = `Server errr: ${dataText}`;
        } 
        else {
            // resultDiv.innerHTML =JSON.stringify(JSON.parse(dataJson));
            resultDiv.innerHTML = JSON.stringify(dataJson);
        }
        
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});

// ADAUGARE CONTRACT
document.getElementById('adaugareContractForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const authToken = document.getElementById('result-auth').textContent;
    const field1 = document.getElementById('field1').value;
    const field2 = document.getElementById('field2').value;
    const resultDiv = document.getElementById('result-adaugare-contract');
    
    try {
        const response = await fetch('api/adaugare-contract.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ authToken, field1, field2 })
        });
        
        const data = response;
        let dataJson = await response.json();

        if (!dataJson) {
            resultDiv.innerHTML = `Server errr: ${dataText}`;
        } 
        else {
            if (dataJson.status == 200) {
                resultDiv.innerHTML = JSON.stringify(dataJson.response)
            } else if (dataJson.status == 2000) {
                resultDiv.innerHTML = 'CERERE TRIMISA <\br>'+ dataJson.response;
            }
            else if (dataJson.status == 401) {
                resultDiv.innerHTML = '401 - Tokenul a exirat';
            }
            else {
                resultDiv.innerHTML = JSON.stringify(dataJson);
            }
        }
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});