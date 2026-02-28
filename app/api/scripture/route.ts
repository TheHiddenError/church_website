import sanitizeHtml from 'sanitize-html';
import * as cheerio from "cheerio";
import { db } from '@/app';
import { votdTable } from '@/app/db/schema';

export const revalidate = 0;

export async function GET(){

    const today = new Date(); 
    const local = new Date( today.toLocaleString("en-US", { timeZone: "America/Chicago" }) );


    const isMidnight = local.getHours() === 0 && local.getMinutes() === 0;

    if (!isMidnight)
        return Response.json({ status: "Not local midnight" });
    const translations = ["nkjv", "rvr1960"]

    const bookName = /(\d* )*[A-Z][a-z]*/

    const chapterAlone = /\d*(?=:)/

    const verseAlone = /(?<=:)(\d*(-\d*)?,)*\d*(-\d*)?/

    const gettingChapter = /(\d* )*[A-Z][a-z]* \d*/
    let verse_en = "";
    let verse_es = "";
    const votd_url = `https://www.biblegateway.com/votd/get/?format=json&version=nkjv`
    let clean_text_en = ""
    let clean_text_es = ""
    let scripture_verse = "Matthew 5:43-45"
    let scripture_verse_es = "";
    let link_verse = "https://www.biblegateway.com/passage/?search="

    let error;

    let webVerses: string [] = [];

    let spanish_ref: string | undefined = ""

    let full_text = "";

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
        scripture_verse = result.votd.reference;
        const bibleName = scripture_verse.match(bookName);
        const chapterNumber = scripture_verse.match(chapterAlone);
        const verseNumbers = scripture_verse.match(verseAlone);
        let classId;
        if (bibleName){
            let temp_chap: string | undefined = bibleName[0];
            spanish_ref = bibleBookMap.get(temp_chap);
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
        }

        
    }) 


    for (const translation of translations){
        if (error)
            break;
        try {
            const temp_chapter = scripture_verse.match(gettingChapter);
            let pageURL: string = "";
            if (temp_chapter){
                if (translation == "nkjv") {
                    verse_en = link_verse + (temp_chapter[0] + "&version=" + translation);
                    pageURL = verse_en;
                }
                else {
                    verse_es = link_verse + (temp_chapter[0] + "&version=" + translation);
                    pageURL = verse_es
                }            
            }
            const response = await fetch(pageURL);
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
            if (translation == "nkjv") {
                clean_text_en = sanitizeHtml(full_text, {
                                allowedTags: [ 'b', 'i', 'h1', 'h2', 'h3', 'h4', 'strong', 'sup', 'span', 'div' ],
                                });
            }
            else {
                clean_text_es = sanitizeHtml(full_text, {
                                allowedTags: [ 'b', 'i', 'h1', 'h2', 'h3', 'h4', 'strong', 'sup', 'span', 'div' ],
                                });
            }
        }catch(err){
            error = err;
            console.error('Error loading HTML:', err);
        }
        full_text = ""
    }

    if (spanish_ref && spanish_ref != ""){
        scripture_verse_es = scripture_verse.replace(bookName, spanish_ref);
    }

    const formattedDate = local.toISOString().split("T")[0]; // "2026-02-19"

    if (!error)
        await db.insert(votdTable).values({
            day: formattedDate,
            content_en: clean_text_en,
            content_es: clean_text_es,
            verse_name_en: scripture_verse,
            verse_name_es: scripture_verse_es,
            verse_link_en: verse_en,
            verse_link_es: verse_es
        })

    return Response.json({status: error ? error: "Data added correctly"});
}