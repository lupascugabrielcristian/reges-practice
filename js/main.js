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
const myAuthToken = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ0QWZKOTk2XzhaZkUzVVczSHpBcGgzbjRaREVLcDdyaWE0SlVHLWNoN2FnIn0.eyJleHAiOjE3NTcwODMzMTAsImlhdCI6MTc1NzA4MTUxMCwianRpIjoiNWUzYjJmNDQtYmJiZS00N2RjLWFhY2UtZjdmZWM1MWZkM2I3IiwiaXNzIjoiaHR0cHM6Ly9zc28uZGV2Lmluc3BlY3RpYW11bmNpaS5vcmcvcmVhbG1zL0FQSSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIxOGJlNTE1Yi1hNjdmLTQ2NjAtYjZlYS1mNjM0OWJjMThiMjciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZWdlcy1hcGkiLCJzaWQiOiIzNDU2NWQ2Mi02ZmNiLTQxNjYtYWFkNy0wZTkyM2ExNzdlN2YiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtYXBpIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkNSSVNUSUFOIExVUEFTQ1UgQklOQVJZIEZVU0lPTiBTLlIuTC4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiIyMzJmN2RmYy0wYzM2LTRjMjMtYWVhNy0yNzE0MTUzNzJjZGUiLCJnaXZlbl9uYW1lIjoiQ1JJU1RJQU4gTFVQQVNDVSIsImF1dGhvcklkIjoiMjMyZjdkZmMtMGMzNi00YzIzLWFlYTctMjcxNDE1MzcyY2RlIiwiZmFtaWx5X25hbWUiOiJCSU5BUlkgRlVTSU9OIFMuUi5MLiIsImVtYWlsIjoiMjMyZjdkZmMtMGMzNi00YzIzLWFlYTctMjcxNDE1MzcyY2RlQGluc3BlY3RpYW11bmNpaS5ybyJ9.hsFERGf39YqzcqycrBlO6718ap0aBZ04rK9OAsJGjbtmnXI4M1H2vSwYmL0ivvQ6bQ8DALHOLJeUw5FyxmyXZw3a_CN8zLLD1J76jcwmqxy0UEH8oj-lwsHyGvFmAjQNudwbMNODef2POkD_Ex0DvaDoeNLCZwl8c8Pq4eMXRM_zwEniygeJZkPL7Gte4qNlsdfu-3JzbZBoMz88FIPIvYHZM6ozMTQnvA5Mp7IazOhWdmqq3aPputmzE-mmb0pK9B4EBK2BVbjPbC-yNQ-9Aj-JJXpl9ZtZnMMtJO06wummMS4ZtZhGrL-wuDp8TG8QRopFgevoxHWeZfMS3lz_Iw

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
            } else {
                resultDiv.innerHTML = JSON.stringify(dataJson);
            }
        }
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});