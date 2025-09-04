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
const myAuthToken = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ0QWZKOTk2XzhaZkUzVVczSHpBcGgzbjRaREVLcDdyaWE0SlVHLWNoN2FnIn0.eyJleHAiOjE3NTY5OTg2ODcsImlhdCI6MTc1Njk5Njg4NywianRpIjoiMTYyZmRiZWQtODUxZi00NzdlLThjZGYtMDdhOWYxYjNjYTdiIiwiaXNzIjoiaHR0cHM6Ly9zc28uZGV2Lmluc3BlY3RpYW11bmNpaS5vcmcvcmVhbG1zL0FQSSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIxOGJlNTE1Yi1hNjdmLTQ2NjAtYjZlYS1mNjM0OWJjMThiMjciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZWdlcy1hcGkiLCJzaWQiOiI2YWVkN2M3Ny1jYzU3LTRmMjUtOGJiMS1kOTdjNjAzZDI1YTAiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtYXBpIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkNSSVNUSUFOIExVUEFTQ1UgQklOQVJZIEZVU0lPTiBTLlIuTC4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiIyMzJmN2RmYy0wYzM2LTRjMjMtYWVhNy0yNzE0MTUzNzJjZGUiLCJnaXZlbl9uYW1lIjoiQ1JJU1RJQU4gTFVQQVNDVSIsImF1dGhvcklkIjoiMjMyZjdkZmMtMGMzNi00YzIzLWFlYTctMjcxNDE1MzcyY2RlIiwiZmFtaWx5X25hbWUiOiJCSU5BUlkgRlVTSU9OIFMuUi5MLiIsImVtYWlsIjoiMjMyZjdkZmMtMGMzNi00YzIzLWFlYTctMjcxNDE1MzcyY2RlQGluc3BlY3RpYW11bmNpaS5ybyJ9.XPuioQfEziWn7tctg3eh7I7v-8L-ACMISgqKFR_nK1cU0c4wiF24UkVLC4eihcO_DoLUjbbN4oDXLNJC5Jl8SAoBGgytVihufTcSHYJ4SjxhASPpWpmnDWWYitHB4VEs30-049C0RbcW_-QIvtxNs4-2nPQxEw4OJpoI3qrsV_qYmNc8xJ7ou97fMkJOHSpJnW1HncOqEAyPshnUFzyRSafC3sgDobEaVqLen0mwa6lynDj9ldVGR0x666V2dI3xdmdqlbMv1VeKPMl5-zr33qX6V_HogQlyBNhzBe9-E7eglDCXMBdwcnI--XyZMJqDKJ_1OXCHQqFhgaQ5WfNjHg
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
        const dataJson = await response.json();

        
        if (!dataJson) {
          resultDiv.innerHTML = `Server errr: $response`;
        } 
        else {
          resultDiv.innerHTML =JSON.stringify(JSON.parse(dataJson));
        }
        
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});