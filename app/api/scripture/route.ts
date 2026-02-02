import { dailyScripture } from "../placeholder.data";

type bibleObject ={
    type: string,
    number: number,
    content: Array<string>
}

export async function GET(){
    const bibleIds = new Map<string, string>

    let info;

    bibleIds.set("Judges", "JDG")
            .set("Song of Songs", "SNG")
            .set("Joel", "JOL")
            .set("Nahum", "NAM")
            .set("Mark", "MRK")
            .set("John", "JHN")
            .set("Philippians", "PHP")
            .set("Philemon", "PHM")
            .set("James", "JAS")



    const testOne = dailyScripture[dailyScripture.length-1];

    const getBook = /(^\d* )?\w+/

    const getChapter = /\d+(?=:)/

    const getStart = /(?<=:)\d+/
    const getEnd = /(?<=-)\d+/

    const theStart = testOne?.scripture.match(getStart);
    const startScripture = theStart == null ? -1: Number(theStart[0]);

    const theEnd = testOne.scripture.match(getEnd);
    const theEndScripture = theEnd == null ? startScripture : Number(theEnd[0]);  


    const temp = testOne.scripture.match(getBook); 
    let book = temp === null ? "" : temp[0];
    let bookMapLookup = bibleIds.get(book);
    if (bookMapLookup === undefined){
        if (book.includes("John")){
            const regexPat = /^(\d [A-Z])\w+([a-z])$/
            const regexMat = book.match(regexPat);
            console.log(regexMat);
            if (regexMat)
                book = regexMat[1].replace(" ", "") + regexMat[2].toUpperCase();
        }
        else {
            const regexPattern = /^\d \w{2}|^\w{3}/
            const regexMatch = book.match(regexPattern);
            if (regexMatch){
                book = regexMatch[0].replace(" ", "").toUpperCase();
            }
        }
    }
    else {
        book = bookMapLookup;
    }
    const temp2 = (testOne.scripture.match(getChapter));
    const the_chapter = temp2 === null ? 0 : temp2[0];

    // const translation = "spa_r09"
    const translation = "eng_kjv"

    const today = "01-22-26";

    let theInfo: bibleObject[] = [];

    await fetch(`https://bible.helloao.org/api/${translation}/${book}/${the_chapter}.json`)
    .then(request => request.json())
    .then(result => {
        let scriptureIndex = startScripture - 1;
        let i = scriptureIndex;
        while (scriptureIndex < theEndScripture) {
            const possibleVerse = result.chapter.content[i];
            if (possibleVerse.type == "verse"){
                for (const element of possibleVerse.content) {
                    if (element.text) {
                        possibleVerse.content = element.text;
                        break;
                    }
                }      
                theInfo.push(possibleVerse);
                scriptureIndex ++;
            }
            i ++;
        }

    });

    return Response.json({apiInformation: theInfo, title: testOne.title, dateReading: testOne.date, reading: testOne.scripture});
}