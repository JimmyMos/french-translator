
import { json } from '@sveltejs/kit'
//
// Rn response async doesnt work so return error while email is sent
export async function POST({ request }) {
    //
    var rJson       = {};
    rJson['status'] = 'error';
    rJson['data'  ] = '';
    //
    //
    const formAsJson = await request.json();
    //
    async function ggTranslate(){
        var textTotranslate = encodeURIComponent('My text');
        var toLanguage      = 'fr'; 
        var url = formAsJson.url;
        console.log('url', url);
        //
        const r = await fetch(url, {method: 'GET'})
        //
        return r;
    };
    const response = await ggTranslate();
    const jsonR = await response.json();
    console.log(jsonR);
    return json(jsonR);
    return new Response(JSON.stringify(jsonR), { status: 200 })
    //
}