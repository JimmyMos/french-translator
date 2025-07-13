<script>
    export var data;
    console.log('Data------------------------------');
    console.log(data)
    //

    //
    import { t, translations } from '$lib/languages/translations';
    //console.log('Traductions-----------------------');
    //console.log(translations.get());
    //
    import projects    from "$lib/data/projects.js";
    import clients     from "$lib/data/clients.js";
    import nav_data    from '$lib/data/nav_data.js';
    import footer_data from "$lib/data/footer_data.js"
    import tools       from "$lib/data/tools.js";
    import Button from "$lib/ui/basics/button.svelte"
    //
    import { onMount }     from 'svelte';
    import { browser }     from '$app/environment';
    //
    import { IsTopOfPage } from '$lib/helpers/dom_scroll_helper'
    import { findParent, hasClass, addClass, removeClass }  from '$lib/helpers/dom_helper'
    //
    import Cropper from "cropperjs";
    import 'cropperjs/dist/cropper.css';
    //
    import Svg from '$lib/ui/basics/svg.svelte';
    import Top_banner from "$lib/ui/header/top_banner.svelte";
    import Header from "$lib/ui/header/header.svelte";
    import Hero   from "$lib/ui/sections/section_hero.svelte";
    import Section_skills   from "$lib/ui/sections/section_skills.svelte";
    import Skill   from '$lib/ui/cards/skill.svelte';
    import Section_portfolio  from "$lib/ui/sections/section_portfolio.svelte";
    import Section_cv         from "$lib/ui/sections/section_cv.svelte";
    import Section_tools      from "$lib/ui/sections/section_tools.svelte";
    import Section_clients    from "$lib/ui/sections/section_clients.svelte";
    import Language_picker from "$lib/ui/utils/language_picker.svelte";
    import Footer from "$lib/ui/footer/footer.svelte";
    import Go_to_top_button from '$lib/ui/utils/go_to_top.svelte';
    import { setTheme } from "$lib/helpers/theme_helper.js"
    import { getTodayData, setUserDateCookie } from "$lib/helpers/date_helper.js"
    import { getThemeFromDate } from "$lib/helpers/theme_helper.js"
    import {setCookie, getCookie} from "$lib/helpers/cookies_helper.js"
    //
    var fonts = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap';
    //
    onMount(() => {
        if(browser){
            /*
            async function postData(url = "", data = {}) {
                // Default options are marked with *
                const response = await fetch(url, {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    headers: {
                    "Content-Type": "application/json",
                    'x-goog-user-project': 'french-translator-405201',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(data), // body data type must match "Content-Type" header
                });
                console.log(`Data sent to ${url} :`);
                console.log(data);
                return response.json(); // parses JSON response into native JavaScript objects
            }
            postData("https://translation.googleapis.com/language/translate/v2", { 
                q   : 'My text in french',
                target  : "fr",
            }).then((data) => {
                console.log(data); // JSON data parsed by `data.json()` call
            });
            //
            */
            var elResult     = document.querySelector('textarea[name=result]');
            var elQuery      = document.querySelector('textarea[name=query]');
            var elCarsLimit  = document.querySelector('#cars_limit');
            var elCopyResult = document.querySelector('#copy_result');
            //
            async function ggTranslate(p_txt){
                var textTotranslate = encodeURIComponent(p_txt);
                var toLanguage      = 'fr'; 
                var url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${toLanguage}&dt=t&q=${textTotranslate}`
                //
                const r = await fetch('/api/get_file', {
                    method: 'POST',
                    body: JSON.stringify({url: url})
                });
                //
                const cleanR = await r.json();
                var translatedText = '';
                try {
                    cleanR[0].forEach(el => {
                        translatedText += `${el[0]}`
                    })
                } catch (error) {
                    console.log(error);
                }
                console.log(cleanR);
                console.log('trad :', translatedText);
                //
                elResult.value = translatedText;
            }
            elQuery.addEventListener('input', e => {
                (async () => {
                    elCarsLimit.innerHTML = `${elQuery.value.length} / 5000`;
                    //
                    await ggTranslate(elQuery.value);
                })();
            })
            elQuery.focus();
            //
            function fallbackCopyTextToClipboard(text) {
                var textArea = document.createElement("textarea");
                textArea.value = text;
                //
                // Avoid scrolling to bottom
                textArea.style.top = "0";
                textArea.style.left = "0";
                textArea.style.position = "fixed";
                //
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                //
                try {
                    var successful = document.execCommand('copy');
                    var msg = successful ? 'successful' : 'unsuccessful';
                    console.log('Fallback: Copying text command was ' + msg);
                } catch (err) {
                    console.error('Fallback: Oops, unable to copy', err);
                }
                //
                document.body.removeChild(textArea);
            }
            function copyTextToClipboard(text) {
                if (!navigator.clipboard) {
                    fallbackCopyTextToClipboard(text);
                    return;
                }
                navigator.clipboard.writeText(text).then(function() {
                    console.log('Async: Copying to clipboard was successful!');
                }, function(err) {
                    console.error('Async: Could not copy text: ', err);
                });
            }
            elCopyResult.addEventListener('click', (e) => {
                copyTextToClipboard(elResult.value);
            })
        }
    })
</script>
     
<svelte:head>
    <link rel="stylesheet" href="/css/variables.css?11231">
    <link rel="stylesheet" href="/css/reset.css?11231">
    <link rel="stylesheet" href="/css/styles.css?11231">

    <title>AI French translator</title>
    <meta name="description" content="AI French translator">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{data.origin}">
    <meta property="og:title" content="AI French translator">
    <meta property="og:description" content="AI French translator">
    <meta property="og:image" content="{data.origin}/favicon.png">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link async href="{fonts}" rel="stylesheet">
    <link rel="shortcut icon" type="image/x-icon" href="/img/logos/logo_jm.png" />
</svelte:head>

<main>
    <div class="project_description_wrapper">
        <h1>Online French translator</h1>
        <p>
            Automatically translate anything to French using AI 🥖
        </p>
    </div>
    <div class="translator_container">
        <div class="textarea_wrapper">
            <textarea maxlength="5000" name="query" ></textarea>
            <span id="cars_limit">0 / 5000</span>
        </div>
        <div class="textarea_wrapper">
            <Svg id="copy_result" icon="/img/icons/copy_icon.svg"/>
            <textarea name="result" readonly ></textarea>
        </div>
    </div>
</main>
<Footer 
    footer_data={footer_data}
    logo="/img/logos/logo_jm.png"
    description={$t('c.short_description')}
    copyright="2023. All rights reserved, by Jimmy Mostovoi."
/>
    
<style lang="scss">
main{
    min-height: 100vh;
    .translator_container{
        width: 100%;
        max-width: 1200px;
        padding-bottom: 40px;
        display: flex;
        gap: 20px;
        margin: 0 auto;
        justify-content: center;
        .textarea_wrapper{
            width: 100%;
            position: relative;
            textarea{
                padding: 16px;
                height: 400px;
                min-height: 100%;
                width: 100%;
                color-scheme: var(--scheme);
                font-size: 24px;
                line-height: 32px;
                border-radius: 4px;
                background-color: var(--mobile_menu_bg);
                box-shadow: inset 0 0 10px var(--input_box_shadow);
                outline: 1px solid var(--input_border);
                transition: var(--transition1);
                resize: none;
                &[name=query]{
                    &:focus-within{
                    outline: 3px solid var(--hilight1);
                }
                }
                &[name=result]{
                    color: #999999;
                    cursor: default
                }
            }
            #cars_limit{
                position: absolute;
                bottom: 10px;
                right: 10px;
            }
            :global(#copy_result){
                position: absolute;
                bottom: 10px;
                right: 10px;
                cursor: pointer;
            }
            :global(#copy_result:hover){
                fill: var(--font_color);
            }
            :global(#copy_result:active){
                transition: 0ms;
                fill: var(--hilight1);
            }
        }
    }
    .project_description_wrapper{
        max-width: 1200px;
        padding: 10px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 40px;
        h1{
            font-size: 38px;
            font-weight: 600;
            margin-bottom: 20px;
        }
        p{

        }
    }
}

@media (max-width: 1200px) {
    .project_description_wrapper{
        margin-bottom: 20px!important;
    }
    .translator_container{
        flex-direction: column;
        justify-content: flex-start!important;
        .textarea_wrapper{
            textarea{
                margin: 0 10px;
                width: calc(100% - 20px)!important;
                height: 200px!important;
            }
            #cars_limit{
                right: 20px!important;
            }
            :global(#copy_result){
                right: 20px!important;
                bottom: 20px!important;
            }
        }
    }
}
</style>