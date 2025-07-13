# French Translator

> 🛑 This project was developed in 2023 and is no longer maintained.

> Proof of concept that hacks the private API used by Google Translate to obtain translations for free—without relying on the official paid API.

This SvelteKit repository demonstrates how to replay the requests made by the mobile / web Google Translate app (`translate.googleapis.com/translate_a/single…`) and bypass billing.

It was created solely to gain hands-on experience with penetration testing, network-traffic reverse engineering, and API-security analysis.
Do not use this code in production: it violates Google’s Terms of Service, can stop working at any time, and carries no warranty.

## Technical workings

**Reverse-engineer** Google Translate traffic to locate the internal endpoint …/translate_a/single.

**Generate the `tk` token** by reproducing the obfuscated algorithm found in Google’s JavaScript.

**Send a “client = gtx” request** (or equivalent) with the parameters:
- sl=auto  # source language detected automatically
- tl=fr  # target = French
- dt=t  # returns only the translated text
- q=…  # URL-encoded text