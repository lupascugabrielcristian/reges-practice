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
const myAuthToken = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ0QWZKOTk2XzhaZkUzVVczSHpBcGgzbjRaREVLcDdyaWE0SlVHLWNoN2FnIn0.eyJleHAiOjE3NTc1OTQyMjMsImlhdCI6MTc1NzU5MjQyMywianRpIjoiZDVhYmRhYTMtYjM0Ni00MGFkLThjYjgtMmYwYTU1N2YwZWU4IiwiaXNzIjoiaHR0cHM6Ly9zc28uZGV2Lmluc3BlY3RpYW11bmNpaS5vcmcvcmVhbG1zL0FQSSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIxOGJlNTE1Yi1hNjdmLTQ2NjAtYjZlYS1mNjM0OWJjMThiMjciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZWdlcy1hcGkiLCJzaWQiOiI3M2E0OGNlZS1kNTNkLTQ3MDUtYmI0My1kYjg1NGQ3MDgyYzYiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtYXBpIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkNSSVNUSUFOIExVUEFTQ1UgQklOQVJZIEZVU0lPTiBTLlIuTC4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiIyMzJmN2RmYy0wYzM2LTRjMjMtYWVhNy0yNzE0MTUzNzJjZGUiLCJnaXZlbl9uYW1lIjoiQ1JJU1RJQU4gTFVQQVNDVSIsImF1dGhvcklkIjoiMjMyZjdkZmMtMGMzNi00YzIzLWFlYTctMjcxNDE1MzcyY2RlIiwiZmFtaWx5X25hbWUiOiJCSU5BUlkgRlVTSU9OIFMuUi5MLiIsImVtYWlsIjoiMjMyZjdkZmMtMGMzNi00YzIzLWFlYTctMjcxNDE1MzcyY2RlQGluc3BlY3RpYW11bmNpaS5ybyJ9.ONrrmoqNiNyPLxONJNF_lYPprfQGvqxbjGDq1WTVh6K19ybfql20vtUcoXjxN0Deyo6Hl2Td4T7v59HJVjGmHVXZm8QaR1qWRKnG3yUMBzrFhtt7i00FC0n_l4sy28kClRtOCPhIgAyMHmj2TOQ0zpKBSfMYiVvIj3Bj-ZTbCFQfcqzLP2FD4CTzUxOaDFORYzbokn6KYZ6Y78_ipWfWuvgeDPBNVk-st3eVfnxOwQ1MzpiQDnsRkUOZbg-1YOSanDsM21SZ0KjWS_0LPO9euaiN4ffDx6Y3ftPHd6f5KYIxfIHNzJaVoN-rrzNVO-TWKenMo_mPEO65u-R7qiC7DA`
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
            if (dataJson.status == 401) {
                resultDiv.innerHTML = '401 - Tokenul a exirat';
            } else {
                resultDiv.innerHTML = JSON.stringify(dataJson);
            }
        }
        
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});

// NOMENCLATOR
document.getElementById('nomenclatorForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const authToken = document.getElementById('result-auth').textContent;
    const tip = document.getElementById('nomenclator-field').value;
    const resultDiv = document.getElementById('result-nomenclator');

    try {
        const response = await fetch('api/nomenclator.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ authToken, tip })
        });
        
        const dataJson = await response.clone().json();
        const dataText = await response.text();

        
        if (!dataJson) {
            resultDiv.innerHTML = `Server errr: ${dataText}`;
        } 
        else {

            try {
                const responseJson = dataJson.response;
                var text = '';

                JSON.parse(responseJson).forEach(item => {
                    text += item.nume + ' codSiruta=' + item.codSiruta + '</br>';
                });


                resultDiv.innerHTML = text;
            }
            catch (err_parse) {
                resultDiv.innerHTML = JSON.stringify(dataJson);
            }
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
        const response = await fetch('api/adaugare-contract-2.php', {
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
                    resultDiv.innerHTML = 'CERERE TRIMISA </br>'+ dataJson.response;
                }
                else if (dataJson.status == 400) {
                    resultDiv.innerHTML = 'BAD REQUEST </br>'+ dataJson.response;
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

// MODIFICARE CONTRACT
document.getElementById('modificareContractForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const authToken = document.getElementById('result-auth').textContent;
    const field1 = document.getElementById('field8').value;
    const field2 = document.getElementById('field9').value;
    const resultDiv = document.getElementById('result-modificare-contract');
    
    try {
        const response = await fetch('api/modificare-contract.php', {
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
                    resultDiv.innerHTML = 'CERERE TRIMISA </br>'+ dataJson.response;
                }
                else if (dataJson.status == 400) {
                    resultDiv.innerHTML = 'BAD REQUEST </br>'+ dataJson.response;
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

// SUSPENDARE CONTRACT
document.getElementById('suspendareContractForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const authToken = document.getElementById('result-auth').textContent;
    const field1 = document.getElementById('field10').value;
    const resultDiv = document.getElementById('result-suspendare-contract');
    
    try {
        const response = await fetch('api/suspendare-contract.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ authToken, field1 })
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
                    resultDiv.innerHTML = 'CERERE TRIMISA </br>'+ dataJson.response;
                }
                else if (dataJson.status == 400) {
                    resultDiv.innerHTML = 'BAD REQUEST </br>'+ dataJson.response;
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

// MODIFICARE SUSPENDARE
document.getElementById('modificareSuspendareForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const authToken = document.getElementById('result-auth').textContent;
    const field1 = document.getElementById('field11').value;
    const resultDiv = document.getElementById('result-modificare-suspendare');
    
    try {
        const response = await fetch('api/modificare-suspendare.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ authToken, field1 })
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
                    resultDiv.innerHTML = 'CERERE TRIMISA </br>'+ dataJson.response;
                }
                else if (dataJson.status == 400) {
                    resultDiv.innerHTML = 'BAD REQUEST </br>'+ dataJson.response;
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
            resultDiv.innerHTML = await response.text();
        }

    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});

// ADAUGARE SALARIAT
document.getElementById('adaugareSalariatForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const authToken = document.getElementById('result-auth').textContent;
    const resultDiv = document.getElementById('result-adaugare-salariat');
    const field3 = document.getElementById('field3').value;
    const field4 = document.getElementById('field4').value;
    
    try {
        const response = await fetch('api/adaugare-salariat.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ authToken, field3, field4 })
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
            resultDiv.innerHTML = await response.text();
        }

    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});

// MODIFICARE SALARIAT
document.getElementById('modificareSalariatForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const authToken = document.getElementById('result-auth').textContent;
    const resultDiv = document.getElementById('result-modificare-salariat');
    const field5 = document.getElementById('field5').value;
    const field6 = document.getElementById('field6').value;
    
    try {
        const response = await fetch('api/modificare-salariat.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ authToken, field5, field6 })
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
            resultDiv.innerHTML = await response.text();
        }

    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});