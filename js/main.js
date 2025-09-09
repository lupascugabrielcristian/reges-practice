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
const myAuthToken = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ0QWZKOTk2XzhaZkUzVVczSHpBcGgzbjRaREVLcDdyaWE0SlVHLWNoN2FnIn0.eyJleHAiOjE3NTc0MTUxMTgsImlhdCI6MTc1NzQxMzMxOCwianRpIjoiODBjMWFmODktYjMwYS00M2MwLWI2YTctNzk4NTg1OTdmYjY0IiwiaXNzIjoiaHR0cHM6Ly9zc28uZGV2Lmluc3BlY3RpYW11bmNpaS5vcmcvcmVhbG1zL0FQSSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIxOGJlNTE1Yi1hNjdmLTQ2NjAtYjZlYS1mNjM0OWJjMThiMjciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZWdlcy1hcGkiLCJzaWQiOiJmNzk2YTE1Yy05MmI1LTQ0ZjAtODJmMy04MjUzNjBlMDViNmMiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtYXBpIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkNSSVNUSUFOIExVUEFTQ1UgQklOQVJZIEZVU0lPTiBTLlIuTC4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiIyMzJmN2RmYy0wYzM2LTRjMjMtYWVhNy0yNzE0MTUzNzJjZGUiLCJnaXZlbl9uYW1lIjoiQ1JJU1RJQU4gTFVQQVNDVSIsImF1dGhvcklkIjoiMjMyZjdkZmMtMGMzNi00YzIzLWFlYTctMjcxNDE1MzcyY2RlIiwiZmFtaWx5X25hbWUiOiJCSU5BUlkgRlVTSU9OIFMuUi5MLiIsImVtYWlsIjoiMjMyZjdkZmMtMGMzNi00YzIzLWFlYTctMjcxNDE1MzcyY2RlQGluc3BlY3RpYW11bmNpaS5ybyJ9.izusVnj699j_WHJug3ZGeDEWgMb4Qk9qTSW0p_gxytJOu_dnzwzgop2O8cHXcXOZ8pZMPsgRQtgdO68zet2JDwq2_p1sLiTXiWjaBskIlxQy2RYrCGg8tuPBAQFnC0Im_srSlCm4AYhW3L0rRCPmbWxoNHaOuS-Cq_dsheVYM1NTIRPBO_KzbHjFzm01cYMKN-3iV_ONMRnCvGAS1cmDmYZ-0OQycJ9iYYp--DR_D2ls-9mkhkfR8Er_3TPCtF5_xkhvjENlH5FT2Vre7Mu5FzxwNWpkxnk7DqK049UER6kPY3CDoBQFLjn-35KHc5wsux7pAMPjDZy18hgV2YTR3Q`
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

// READ MESSAGE
document.getElementById('readMessageForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const authToken = document.getElementById('result-auth').textContent;
    const resultDiv = document.getElementById('result-read-message');

    // Sterg continutul de la raspunsul mesajului de "Commit Read"
    document.getElementById('result-commit-read').innerHTML = '';

    // Ceva sa arat ca se incarca
    resultDiv.innerHTML = 'Se face apelul...';
    
    try {
        const response = await fetch('api/read-message.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ authToken })
        });
        
        try {
            let dataJson = await response.clone().json();

            if (!dataJson ) {
                resultDiv.innerHTML = `Server errr: ${dataJson }`;
            } 
            else {
                if (dataJson.status == 204) {
                    resultDiv.innerHTML = 'Nu mai sunt mesaje necitite';
                }
                else if (dataJson.status == 200) {
                    const responseJson = JSON.parse(dataJson['response'])
                    console.log(responseJson);
                    var text = responseJson.result.code + '</br>';
                    text += 'Ref: ' + responseJson.result.ref + '</br>';
                    text += 'ResponseId: ' + responseJson.responseId + '</br>';
                    text += responseJson.result.description + '</br>';

                    resultDiv.innerHTML = text;
                } else if (dataJson.status == 2000) {
                    resultDiv.innerHTML = 'CERERE TRIMISA <\br>'+ dataJson.response;
                }
                else if (dataJson.status == 401) {
                    resultDiv.innerHTML = '401 - Tokenul a exirat';
                }
                else {
                    // Rezultatul are date
                    resultDiv.innerHTML = JSON.stringify(dataJson);
                }
            }
        } catch (err_p) {
            debugger;
            resultDiv.innerHTML = await response.text();
        }

    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});

// COMMIT READ
document.getElementById('commitReadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const authToken = document.getElementById('result-auth').textContent;
    const resultDiv = document.getElementById('result-commit-read');
    
    try {
        const response = await fetch('api/commit-read.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ authToken })
        });
        
        try {
            let dataJson = await response.clone().json();

            if (!dataJson ) {
                resultDiv.innerHTML = `Server errr: ${dataJson }`;
            } 
            else {
                if (dataJson.status == 200) {
                    // La apelul asta nu primesc nici un raspuns in continut
                    resultDiv.innerHTML = 'OK';
                } else if (dataJson.status == 2000) {
                    resultDiv.innerHTML = 'CERERE TRIMISA <\br>'+ dataJson.response;
                }
                else if (dataJson.status == 401) {
                    resultDiv.innerHTML = '401 - Tokenul a exirat';
                }
                else {
                    // Rezultatul are date
                    resultDiv.innerHTML = JSON.stringify(dataJson);
                }
            }
        } catch (err_p) {
            debugger;
            resultDiv.innerHTML = await response.text();
        }

    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});