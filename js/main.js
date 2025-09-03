document.getElementById('dataForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const message = document.getElementById('message').value;
    const resultDiv = document.getElementById('result');
    
    try {
        const response = await fetch('api/process.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message })
        });
        
        const data = await response.json();
        resultDiv.innerHTML = `Server response: ${data.response}`;
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    }
});


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