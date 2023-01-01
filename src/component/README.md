### Basic Doc

## Get All customers

query($key: String, $value: String){
allCustomers (key: "roles", value: "CUSTOMER|USER"){
id
name
phone_no
status
email
address
order_status
delivery_detail {
delivery_by
delivery_charge
delivery_address
delivery_phone
}
engage
user
orders
createdAt
updatedAt
}
}
}

## All Users

query($key: String, $value: String){
allUsers (key: "roles", value: "CUSTOMER"){
id
name
phone_no
status
email
createdAt
updatedAt
}
}

//copy past
This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

## compositon Vs Inheritance

Inheritance, Bad practice in React : [Link](https://reactjs.org/docs/composition-vs-inheritance.html)

Print [https://stackoverflow.com/questions/51263460/javascript-css-hide-page-url-when-printing-in-chrome-but-still-show-the-page-nu]
