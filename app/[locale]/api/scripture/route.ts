import { dailyScripture } from "../placeholder.data";
import sanitizeHtml from 'sanitize-html';
import { getLocale } from "next-intl/server";


type bibleObject ={
    type: string,
    number: number,
    content: Array<string>
}

export async function GET(){

    const locale = await getLocale();
    const translation = locale == "en" ? "nkjv": "rvr1960"

    const gettingChapter = /\d* [A-Z][a-z]*/

    const votd_url = `https://www.biblegateway.com/votd/get/?format=json&version=${translation}`
    let clean_text = ""
    let scripture_verse = ""
    let link_verse = "https://www.biblegateway.com/passage/?search="

    await fetch(votd_url)
    .then(request=> request.json())
    .then(result=>{
        const temp_text = result.votd.content;
        clean_text = sanitizeHtml(temp_text, {
            allowedTags: [ 'b', 'i', 'h1', 'h2', 'h3', 'h4', 'strong', 'a' ],
            });
        scripture_verse = result.votd.reference;
        const temp_chapter = scripture_verse.match(gettingChapter)
        if (temp_chapter)
            link_verse+=(temp_chapter[0] + "&version=" + translation);
    })


    // const bibleIds = new Map<string, string>

    // let info;

    // bibleIds.set("Judges", "JDG")
    //         .set("Song of Songs", "SNG")
    //         .set("Joel", "JOL")
    //         .set("Nahum", "NAM")
    //         .set("Mark", "MRK")
    //         .set("John", "JHN")
    //         .set("Philippians", "PHP")
    //         .set("Philemon", "PHM")
    //         .set("James", "JAS")



    // const testOne = dailyScripture[dailyScripture.length-3];

    // const getBook = /(^\d* )?\w+/

    // const getChapter = /\d+(?=:)/

    // const getStart = /(?<=:)\d+/
    // const getEnd = /(?<=-)\d+/

    // const theStart = testOne?.scripture.match(getStart);
    // const startScripture = theStart == null ? -1: Number(theStart[0]);

    // const theEnd = testOne.scripture.match(getEnd);
    // const theEndScripture = theEnd == null ? startScripture : Number(theEnd[0]);  


    // const temp = testOne.scripture.match(getBook); 
    // let book = temp === null ? "" : temp[0];
    // let bookMapLookup = bibleIds.get(book);
    // if (bookMapLookup === undefined){
    //     if (book.includes("John")){
    //         const regexPat = /^(\d [A-Z])\w+([a-z])$/
    //         const regexMat = book.match(regexPat);
    //         console.log(regexMat);
    //         if (regexMat)
    //             book = regexMat[1].replace(" ", "") + regexMat[2].toUpperCase();
    //     }
    //     else {
    //         const regexPattern = /^\d \w{2}|^\w{3}/
    //         const regexMatch = book.match(regexPattern);
    //         if (regexMatch){
    //             book = regexMatch[0].replace(" ", "").toUpperCase();
    //         }
    //     }
    // }
    // else {
    //     book = bookMapLookup;
    // }
    // const temp2 = (testOne.scripture.match(getChapter));
    // const the_chapter = temp2 === null ? 0 : temp2[0];

    // // const translation = "spa_r09"
    // const translation = "eng_kjv"

    // const today = "01-22-26";

    // let theInfo: bibleObject[] = [];

    // await fetch(`https://bible.helloao.org/api/${translation}/${book}/${the_chapter}.json`)
    // .then(request => request.json())
    // .then(result => {
    //     let scriptureIndex = startScripture - 1;
    //     let i = scriptureIndex;
    //     while (scriptureIndex < theEndScripture) {
    //         const possibleVerse = result.chapter.content[i];
    //         if (possibleVerse.type == "verse"){
    //             for (const element of possibleVerse.content) {
    //                 if (element.text) {
    //                     possibleVerse.content = element.text;
    //                     break;
    //                 }
    //             }      
    //             theInfo.push(possibleVerse);
    //             scriptureIndex ++;
    //         }
    //         i ++;
    //     }

    // });
    return Response.json({text: clean_text, verse: scripture_verse, translation: (locale == "en" ? "NKJV": "RV1960"), link: link_verse});
    // return Response.json({apiInformation: theInfo, title: testOne.title, dateReading: testOne.date, reading: testOne.scripture});
}