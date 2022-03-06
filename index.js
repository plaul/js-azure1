
document.getElementById("btn-get-user").onclick = getUser
document.getElementById("btn-get-all").onclick = getAllUsers


function getUser() {
  const id = document.getElementById("id-input").value
  fetch("https://jsonplaceholder.typicode.com/users/" + id)
    .then(res => {
      if (!res.ok) {
        return Promise.reject("Error " + res.status)
      }
      return res.json()
    })
    .then(data => {
      console.log(data)
      document.getElementById("user-name").innerText = data.name
      document.getElementById("user-phone").innerText = data.phone
      document.getElementById("user-street").innerText = data.address.street
    })
    .catch(e => console.error("Upps: " + e))
}

function getAllUsers() {
  console.log("Called")
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => {
      if (!res.ok) {
        return Promise.reject("Error " + res.status)
      }
      return res.json()
    })
    .then(data => {
      console.log(data)
      const rows = data.map(u => `
      <tr>
         <td>${encode(u.name)}</td>
         <td>${encode(u.phone)}</td>
         <td>${encode(u.address.street)}</td>
         <td>${encode(u.address.city)}</td>
         
      </tr>
      `).join("\n")
      document.getElementById("tbl-body").innerHTML = rows

    })
    .catch(e => console.error("Upps: " + e))
}

/**
 * The encoder method we have used when inserting untrusted data via the innerHTML property
 * Ref: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
 * @param {str} str 
 * @returns the encode string
 */
export function encode(str) {
  let encoded = "" + str
  encoded = encoded.replace(/&/g, "&amp;");
  encoded = encoded.replace(/>/g, "&gt;");
  encoded = encoded.replace(/</g, "&lt;");
  encoded = encoded.replace(/"/g, "&quot;");
  encoded = encoded.replace(/'/g, "&#039;");
  return encoded;
}







// fetch("https://jsonplaceholder.typicode.com/users",
//   {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify({
//       "name": "Kurt Wonnegut"
//     })
//   }
// )
//   .then(res => res.json())
//   .then(data => console.log(data))




// fetch("https://jsonplaceholder.typicode.com/users/1")
//   .then(res => {
//     if (!res.ok) {
//       return Promise.reject("Error " + res.status)
//     }
//     return res.json()
//   })
//   .then(data => console.log(data))
//   .catch(e => console.error("Upps: " + e))