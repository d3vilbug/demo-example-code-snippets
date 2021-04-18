const express = require("express")
const path = require("path")
const bodyParser = require('body-parser');
const CryptoJS = require("crypto-js");
const cors = require("cors");

const _secret_key = "aaaaaaaaaaaaaaaa"; // YWFhYWFhYWFhYWFhYWFhYQ==
const _iv_param = "bbbbbbbbbbbbbbbb";  // YmJiYmJiYmJiYmJiYmJiYg==

function do_encrypt(_str){
    var key = CryptoJS.enc.Utf8.parse(_secret_key);
    var iv = CryptoJS.enc.Utf8.parse(_iv_param);
    var enc_data = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(_str), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return enc_data.toString();
}

function do_decrypt(_str){
    var key = CryptoJS.enc.Utf8.parse(_secret_key);
    var iv = CryptoJS.enc.Utf8.parse(_iv_param);
    var plain_text = CryptoJS.AES.decrypt(_str, key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return plain_text.toString(CryptoJS.enc.Utf8);
}


const app = express();
app.use("/v1_login", bodyParser.text({type:"*/*"}));
app.use("/v2_login", bodyParser.urlencoded({ extended: true }));
app.use("/v3_login", bodyParser.json());
app.use("/v4_login", bodyParser.json());
app.use("/v6_login", bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: '*'}));


app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname + "/demo.html"));
})

app.post("/v1_login", (req, res) => {
    // console.log(req.body);
    var dec_body = (do_decrypt(req.body));
    console.log(dec_body);
    var res_data = "you sent :: " + dec_body.toString();
    var enc_res_data = do_encrypt(res_data).toString(); 
    // console.log(res_data);
    // console.log(enc_res_data);
    res.write(enc_res_data);
    // res.sendStatus(200);
    res.end();
    
});


app.post("/v2_login", (req, res) => {
    console.log("username :: " + req.body.username);
    console.log("password :: " + req.body.password);

    var _username = do_decrypt(req.body.username);
    var _password = do_decrypt(req.body.password);

    var res_body = "you sent :: username=" + _username + " :: password="+_password
    res.write(do_encrypt(res_body));
    res.end();
    
});

app.post("/v3_login", (req, res) => {
    console.log("username :: " + req.body.username);
    console.log("password :: " + req.body.password);

    var _username = do_decrypt(req.body.username);
    var _password = do_decrypt(req.body.password);

    var res_body = "you sent :: username=" + _username + " :: password="+_password
    
    res.write(res_body);
    res.end();
    
});

app.post("/v4_login", (req, res) => {
    console.log("username :: " + req.body.username);
    console.log("password :: " + req.body.password);

    var _username = do_decrypt(req.body.username);
    var _password = do_decrypt(req.body.password);

    var res_body = '{ "username":"' + do_encrypt(_username) + '","password":"' + do_encrypt(_password) + '"}';
    
    res.write(res_body);
    res.end();
    
});

app.post("/v5_login", (req, res) => {
    console.log("data :: " + req.body.data);    
    var _data = do_decrypt(req.body.data);
    
    console.log(_data);
    res.write("{\"data\":\"" + do_encrypt(_data) + "\"}");
    res.end();
    
});

app.post("/v6_login", (req, res) => {
    console.log("data :: " + req.body.data);    
    var _data = do_decrypt(req.body.data);
    
    console.log(_data);
    res.write("{\"data\":\"" + do_encrypt(_data) + "\"}");
    res.end();
    
});




app.listen(3000)
console.log("Express server started on port 3000 ...... ");


