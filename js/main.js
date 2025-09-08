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
        
        const dataJson = await response.json();

        
        if (!dataJson) {
          resultDiv.innerHTML = `Server errr: $response`;
        } 
        else {
          const jsonRes = JSON.parse(dataJson);
          if (!!jsonRes['access_token']) {
            resultDiv.innerHTML = jsonRes['access_token'];
          } else {
            resultDiv.innerHTML = jsonRes['error_description']
          }
        }
        
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});

// PROFILE
const myAuthToken = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ0QWZKOTk2XzhaZkUzVVczSHpBcGgzbjRaREVLcDdyaWE0SlVHLWNoN2FnIn0.eyJleHAiOjE3NTczNDY4OTAsImlhdCI6MTc1NzM0NTA5MCwianRpIjoiZmRkNTQ3ZjEtMmE3ZC00NTA1LWFjNzktYzNiMGJjZTExMGJmIiwiaXNzIjoiaHR0cHM6Ly9zc28uZGV2Lmluc3BlY3RpYW11bmNpaS5vcmcvcmVhbG1zL0FQSSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIxOGJlNTE1Yi1hNjdmLTQ2NjAtYjZlYS1mNjM0OWJjMThiMjciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZWdlcy1hcGkiLCJzaWQiOiJlOWMwZjYzZS0zZGMzLTQ5NGYtYjFiMy1iNThkN2IwNTRjYjAiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtYXBpIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkNSSVNUSUFOIExVUEFTQ1UgQklOQVJZIEZVU0lPTiBTLlIuTC4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiIyMzJmN2RmYy0wYzM2LTRjMjMtYWVhNy0yNzE0MTUzNzJjZGUiLCJnaXZlbl9uYW1lIjoiQ1JJU1RJQU4gTFVQQVNDVSIsImF1dGhvcklkIjoiMjMyZjdkZmMtMGMzNi00YzIzLWFlYTctMjcxNDE1MzcyY2RlIiwiZmFtaWx5X25hbWUiOiJCSU5BUlkgRlVTSU9OIFMuUi5MLiIsImVtYWlsIjoiMjMyZjdkZmMtMGMzNi00YzIzLWFlYTctMjcxNDE1MzcyY2RlQGluc3BlY3RpYW11bmNpaS5ybyJ9.XFRhem7_H5c2vlNw_4PEiOdZzbgPKt13ULoB7HR-Yf4g_sRrDSqPXN7Q-16iCOiAh4Ra_Q1nvrIdS0n6_k6YhqJ4RJzYyVcLarbwbdZLd-lVnZG3kfTpYPXTc_fTNskQKHuhA_hBoJM6tDBye0uJiWP0eRmfEiDz-RAqC0x56iq63vCPZb52PyekKRGmdU7v0gnGv3YSwzIDjwj1edraiR7AuolwB4_7udlr80VqKQ6kpACGC7tYPKmefjLbanIQso2pnGM5vSyVFtg8ry6-jkgz1MnzWFyaCu4lIh70nYrckEuipqE_M5Rk_iCZiIQdTfR6i030lYSVozzHo8NpjQ`
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
        
        try {
            let dataJson = await response.clone().json();

            if (!dataJson ) {
                resultDiv.innerHTML = `Server errr: ${dataJson }`;
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
        } catch (err_p) {
            resultDiv.innerHTML = await response.text();
        }

    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});