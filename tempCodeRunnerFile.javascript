const axios = require('axios');
let data = JSON.stringify({
  "user_id": 200,
  "limit": 10
});

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://chatbot-qa-backend.purplepebble-adb93c94.eastus.azurecontainerapps.io/api/fetchanswered/academics',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTY5NjY4MDE3MCwiZXhwIjoxNjk2NzIzMjcwfQ.K9qiHZJ5Gy6Ma-ag2sWcn4tOiCHUnLdUXfZ0bX0iGMA'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
