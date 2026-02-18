import { dailyScripture } from "../placeholder.data";
import sanitizeHtml from 'sanitize-html';
import { getLocale } from "next-intl/server";
import * as cheerio from "cheerio";


type bibleObject ={
    type: string,
    number: number,
    content: Array<string>
}

export async function GET(){

    const locale = await getLocale();
    const translation = locale == "en" ? "nkjv": "rvr1960"

    const bookName = /(\d* )*[A-Z][a-z]*/

    const chapterAlone = /\d*(?=:)/

    const verseAlone = /(?<=:)(\d*(-\d*)?,)*\d*(-\d*)?/

    const gettingChapter = /(\d* )*[A-Z][a-z]* \d*/


    const votd_url = `https://www.biblegateway.com/votd/get/?format=json&version=${translation}`
    let clean_text = ""
    let scripture_verse = "Matthew 5:43-45"
    let link_verse = "https://www.biblegateway.com/passage/?search="

    let webVerses: string [] = [];

    let spanish_ref: string | undefined = ""

    let full_text = "";

    // const bibleBooksMap = new Map([
    // // Old Testament
    // ["Génesis", "Genesis"],
    // ["Éxodo", "Exodus"],
    // ["Levítico", "Leviticus"],
    // ["Números", "Numbers"],
    // ["Deuteronomio", "Deuteronomy"],
    // ["Josué", "Joshua"],
    // ["Jueces", "Judges"],
    // ["Rut", "Ruth"],
    // ["1 Samuel", "1 Samuel"],
    // ["2 Samuel", "2 Samuel"],
    // ["1 Reyes", "1 Kings"],
    // ["2 Reyes", "2 Kings"],
    // ["1 Crónicas", "1 Chronicles"],
    // ["2 Crónicas", "2 Chronicles"],
    // ["Esdras", "Ezra"],
    // ["Nehemías", "Nehemiah"],
    // ["Ester", "Esther"],
    // ["Job", "Job"],
    // ["Salmos", "Psalms"],
    // ["Proverbios", "Proverbs"],
    // ["Eclesiastés", "Ecclesiastes"],
    // ["Cantares", "Song of Solomon"],
    // ["Isaías", "Isaiah"],
    // ["Jeremías", "Jeremiah"],
    // ["Lamentaciones", "Lamentations"],
    // ["Ezequiel", "Ezekiel"],
    // ["Daniel", "Daniel"],
    // ["Oseas", "Hosea"],
    // ["Joel", "Joel"],
    // ["Amós", "Amos"],
    // ["Abdías", "Obadiah"],
    // ["Jonás", "Jonah"],
    // ["Miqueas", "Micah"],
    // ["Nahúm", "Nahum"],
    // ["Habacuc", "Habakkuk"],
    // ["Sofonías", "Zephaniah"],
    // ["Hageo", "Haggai"],
    // ["Zacarías", "Zechariah"],
    // ["Malaquías", "Malachi"],

    // // New Testament
    // ["Mateo", "Matthew"],
    // ["Marcos", "Mark"],
    // ["Lucas", "Luke"],
    // ["Juan", "John"],
    // ["Hechos", "Acts"],
    // ["Romanos", "Romans"],
    // ["1 Corintios", "1 Corinthians"],
    // ["2 Corintios", "2 Corinthians"],
    // ["Gálatas", "Galatians"],
    // ["Efesios", "Ephesians"],
    // ["Filipenses", "Philippians"],
    // ["Colosenses", "Colossians"],
    // ["1 Tesalonicenses", "1 Thessalonians"],
    // ["2 Tesalonicenses", "2 Thessalonians"],
    // ["1 Timoteo", "1 Timothy"],
    // ["2 Timoteo", "2 Timothy"],
    // ["Tito", "Titus"],
    // ["Filemón", "Philemon"],
    // ["Hebreos", "Hebrews"],
    // ["Santiago", "James"],
    // ["1 Pedro", "1 Peter"],
    // ["2 Pedro", "2 Peter"],
    // ["1 Juan", "1 John"],
    // ["2 Juan", "2 John"],
    // ["3 Juan", "3 John"],
    // ["Judas", "Jude"],
    // ["Apocalipsis", "Revelation"],
    // ]);

const bibleBookMap = new Map([
    // Old Testament
    ["Genesis", "Génesis"],
    ["Exodus", "Éxodo"],
    ["Leviticus", "Levítico"],
    ["Numbers", "Números"],
    ["Deuteronomy", "Deuteronomio"],
    ["Joshua", "Josué"],
    ["Judges", "Jueces"],
    ["Ruth", "Rut"],
    ["1 Samuel", "1 Samuel"],
    ["2 Samuel", "2 Samuel"],
    ["1 Kings", "1 Reyes"],
    ["2 Kings", "2 Reyes"],
    ["1 Chronicles", "1 Crónicas"],
    ["2 Chronicles", "2 Crónicas"],
    ["Ezra", "Esdras"],
    ["Nehemiah", "Nehemías"],
    ["Esther", "Ester"],
    ["Job", "Job"],
    ["Psalms", "Salmos"],
    ["Proverbs", "Proverbios"],
    ["Ecclesiastes", "Eclesiastés"],
    ["Song of Solomon", "Cantares"],
    ["Isaiah", "Isaías"],
    ["Jeremiah", "Jeremías"],
    ["Lamentations", "Lamentaciones"],
    ["Ezekiel", "Ezequiel"],
    ["Daniel", "Daniel"],
    ["Hosea", "Oseas"],
    ["Joel", "Joel"],
    ["Amos", "Amós"],
    ["Obadiah", "Abdías"],
    ["Jonah", "Jonás"],
    ["Micah", "Miqueas"],
    ["Nahum", "Nahúm"],
    ["Habakkuk", "Habacuc"],
    ["Zephaniah", "Sofonías"],
    ["Haggai", "Hageo"],
    ["Zechariah", "Zacarías"],
    ["Malachi", "Malaquías"],

    // New Testament
    ["Matthew", "Mateo"],
    ["Mark", "Marcos"],
    ["Luke", "Lucas"],
    ["John", "Juan"],
    ["Acts", "Hechos"],
    ["Romans", "Romanos"],
    ["1 Corinthians", "1 Corintios"],
    ["2 Corinthians", "2 Corintios"],
    ["Galatians", "Gálatas"],
    ["Ephesians", "Efesios"],
    ["Philippians", "Filipenses"],
    ["Colossians", "Colosenses"],
    ["1 Thessalonians", "1 Tesalonicenses"],
    ["2 Thessalonians", "2 Tesalonicenses"],
    ["1 Timothy", "1 Timoteo"],
    ["2 Timothy", "2 Timoteo"],
    ["Titus", "Tito"],
    ["Philemon", "Filemón"],
    ["Hebrews", "Hebreos"],
    ["James", "Santiago"],
    ["1 Peter", "1 Pedro"],
    ["2 Peter", "2 Pedro"],
    ["1 John", "1 Juan"],
    ["2 John", "2 Juan"],
    ["3 John", "3 Juan"],
    ["Jude", "Judas"],
    ["Revelation", "Apocalipsis"]
    ]);


    const threeLetters = new Set([
        //Old Testament
        "Genesis",
        "Leviticus",
        "Numbers",
        "Nehemiah",
        "Job",
        "Isaiah",
        "Jeremiah",
        "Lamentations",
        "Daniel",
        "Hosea",
        "Micah",
        "Nahum",
        "Habakkuk",
        "Haggai",
        "Malachi",

        //New Testament
        "Romans",
        "Galatians",
        "Ephesians",
        "Colossians",
        "Hebrews",
        "Revelation"
    ]);

    const twoLetters = "Psalms"

    const fiveLetters = new Set([
        "Jonah",
        "Titus",
        "1 John",
        "2 John", 
        "3 John"
    ]);

    const sixLetters = new Set([
        "1 Thessalonians",
        "2 Thessalonians"
    ])

    const differentStrings = new Map([
        ["1 Kings", "1Kgs"],
        ["2 Kings", "2Kgs"],
        ["James", "Jas"]
    ])


    await fetch(votd_url)
    .then(request=> request.json())
    .then(result=>{
        // scripture_verse = result.votd.reference;
        const bibleName = scripture_verse.match(bookName);
        const chapterNumber = scripture_verse.match(chapterAlone);
        const verseNumbers = scripture_verse.match(verseAlone);
        let classId;
        if (bibleName){
            let temp_chap: string | undefined = bibleName[0];
            if (locale == "es"){
                spanish_ref = bibleBookMap.get(temp_chap);
            }
            if (temp_chap){
                let no_spaces = temp_chap.replace(" ", "");
                if (threeLetters.has(temp_chap)){
                    classId = no_spaces.substring(0,3);
                }
                else if (temp_chap == twoLetters)
                    classId = "Ps"
                else if (fiveLetters.has(temp_chap))
                    classId = no_spaces.substring(0,5);
                else if (sixLetters.has(temp_chap))
                    classId = no_spaces.substring(0,6);
                else if (differentStrings.has(temp_chap))
                    classId = differentStrings.get(temp_chap)
                else 
                    classId = no_spaces.substring(0,4);

            }
        }
        console.log(classId);
        console.log(chapterNumber);
        if (classId && chapterNumber && verseNumbers){
            let temporaryVerses = verseNumbers[0];
            let arrayVerses;
            if (temporaryVerses.includes(",")) {
                arrayVerses = temporaryVerses.split(",");
                for (const element of arrayVerses){
                    if (!element.includes("-"))
                        webVerses.push(`${classId}-${chapterNumber[0]}-${element}`);
                    else {
                        const [first, last] = element.split("-");
                        for (let i = Number(first); i <= Number(last); i++){
                            webVerses.push(`${classId}-${chapterNumber[0]}-${i}`);
                        }
                    }
                    webVerses.push(" ");
                }
            }
            else {
                if (temporaryVerses.includes("-")){
                    const [first, last] = temporaryVerses.split("-");
                    for (let i = Number(first); i <= Number(last); i++){
                        webVerses.push(`${classId}-${chapterNumber[0]}-${i}`);
                    }
                }
                else {
                    webVerses.push(`${classId}-${chapterNumber[0]}-${temporaryVerses}`)
                }
            }
            console.log(webVerses)
            
        }

        // console.log(scripture_verse)
        const temp_chapter = scripture_verse.match(gettingChapter)
        if (temp_chapter)
            link_verse+=(temp_chapter[0] + "&version=" + translation);
        
    }) //work on a way to deal with comma passages. Example: Romans 8:35,37

    try {
        const response = await fetch(link_verse);
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const html = await response.text();
        const $ = cheerio.load(html);
        for (const element of webVerses){
            if (element == " "){
                full_text += "<div> </div>"
            }
            else {
                $(`span.${element}`).each((i, el) => {
                    const $el = $(el);

                    $el.find("sup").not(".versenum").remove();

                    $el.find("span.chapternum").replaceWith("<sup>1&nbsp;</sup>");

                    let result = $el.html()?.trim();
                    const isHeader = $el.parent().prop('tagName')?.match(/H\d/);
                    if (isHeader){
                        result = `<${isHeader[0].toLowerCase()}> ${result} </${isHeader[0].toLowerCase()}>`
                    };
                    full_text += result + " ";
                });

            }
        }
        clean_text = sanitizeHtml(full_text, {
            allowedTags: [ 'b', 'i', 'h1', 'h2', 'h3', 'h4', 'strong', 'sup', 'span', 'div' ],
            });
    }catch(err){
        console.error('Error loading HTML:', err);
    }

    if (spanish_ref && spanish_ref != ""){
        scripture_verse = scripture_verse.replace(bookName, spanish_ref);
    }


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