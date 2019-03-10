# traffic-app

>This application fetches realtime(not sure) traffic data from İstanbul Büyükşehir Belediyesi [Trafik Kontrol Merkezi (TKM)](https://uym.ibb.gov.tr/hizmetler/trafik-bilgilendirme)

## Notice
Application is *Instable* and *Not fully documented*

# How It's Made ?

[TKM](https://uym.ibb.gov.tr/hizmetler/trafik-bilgilendirme) data was encrypted with unknown algorithm. Searched the 
internet to access this data but no out of luck.
Then I found **[eoner](https://github.com/eoner/libTKM)**'s application.It was written in **C#**. I used to write it
very long time ago.
 
 Decided to convert it's functions into my favorite language which is **JavaScript** to use in a **Nodejs**.
 Conversion was successful as it seen here as a repo.
 
 Converting functions and decryptors were so hard and
 at some points **impossible** Due to lack of language properties (Converting binary chars from binary codes, char codes
, etc..)

### Tool
[Bridge.NET](https://bridge.net) library helped me a lot. Picked up some **C#** spesific functions to aid
conversion.It worked like a **Polyfill** for JavaScript.This app comes wit a **Bridge.NET** javascript file due to 
no **npm** libraries.

### Process
I re-writed the data decryption library [libTKM](https://github.com/eoner/libTKM/blob/master/libTKM/Decrypt.cs) 
with aid of [Bridge.NET](https://bridge.net) into **JavaScript**

### Installation
```bash
yarn install
```

### Running
```bash
yarn start
```

## License
tkmLib [eoner](https://github.com/eoner/)

MIT © [Semih Onay](https://semihonay.tk)