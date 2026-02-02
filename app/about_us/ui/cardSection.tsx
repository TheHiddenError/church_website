import clsx from "clsx";
import Image from "next/image";

type CardProps = {
    image: string,
    title: string,
    info: string [],
    reverse?: boolean
}


const dummyText = `
So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book.

It's difficult to find examples of lorem ipsum in use before Letraset made it popular as a dummy text in the 1960s, although McClintock says he remembers coming across the lorem ipsum passage in a book of old metal type samples. So far he hasn't relocated where he once saw the passage, but the popularity of Cicero in the 15th century supports the theory that the filler text has been used for centuries.

And anyways, as Cecil Adams reasoned, “[Do you really] think graphic arts supply houses were hiring classics scholars in the 1960s?” Perhaps. But it seems reasonable to imagine that there was a version in use far before the age of Letraset.

McClintock wrote to Before & After to explain his discovery:

“What I find remarkable is that this text has been the industry’s standard dummy text ever since some printer in the 1500s took a galley of type and scrambled it to make a type specimen book; it has survived not only four centuries of letter-by-letter resetting but even the leap into electronic typesetting, essentially unchanged except for an occasional ‘ing’ or ‘y’ thrown in. It's ironic that when the then-understood Latin was scrambled, it became as incomprehensible as Greek; the phrase ‘it’s Greek to me’ and ‘greeking’ have common semantic roots!” (The editors published his letter in a correction headlined “Lorem Oopsum”).

As an alternative theory, (and because Latin scholars do this sort of thing) someone tracked down a 1914 Latin edition of De Finibus which challenges McClintock's 15th century claims and suggests that the dawn of lorem ipsum was as recent as the 20th century. The 1914 Loeb Classical Library Edition ran out of room on page 34 for the Latin phrase “dolorem ipsum” (sorrow in itself). Thus, the truncated phrase leaves one page dangling with “do-”, while another begins with the now ubiquitous “lorem ipsum”.

Whether a medieval typesetter chose to garble a well-known (but non-Biblical—that would have been sacrilegious) text, or whether a quirk in the 1914 Loeb Edition inspired a graphic designer, it's admittedly an odd way for Cicero to sail into the 21st century.
`

const dummyText2 = `
The decade that brought us Star Trek and Doctor Who also resurrected Cicero—or at least what used to be Cicero—in an attempt to make the days before computerized design a little less painstaking.

The French lettering company Letraset manufactured a set of dry-transfer sheets which included the lorem ipsum filler text in a variety of fonts, sizes, and layouts. These sheets of lettering could be rubbed on anywhere and were quickly adopted by graphic artists, printers, architects, and advertisers for their professional look and ease of use.

Aldus Corporation, which later merged with Adobe Systems, ushered lorem ipsum into the information age with its desktop publishing software Aldus PageMaker. The program came bundled with lorem ipsum dummy text for laying out page content, and other word processors like Microsoft Word followed suit. More recently the growth of web design has helped proliferate lorem ipsum across the internet as a placeholder for future text—and in some cases the final content (this is why we proofread, kids).
`

const lines1 = dummyText.split(/\n/);
const lines2 = dummyText2.split(/\n/);


function Cards({image, title, info, reverse = false}: CardProps){
    return(
        <div className= "grid grid-cols-3 mt-20">
            <div className={clsx("h-full bg-gray-200 rounded-lg w-3/4 relative", reverse ? "order-2": "order-1 place-self-end")}>
                {image != "" && <Image className="object-cover" src={image} alt ="cross image" fill />}
            </div>
            <div className={clsx("col-span-2 mx-5 mt-3 w-17/20", reverse ? "order-1 place-self-end": "order-2")}>
                <div className="font-extrabold text-3xl p-2 text-center">
                    {title}
                </div>
                {info.map((line) => {
                    if (line != "")
                        return(
                        <div key = {line} className="text-md p-2">
                            {line}
                        </div>
                        )
                })}
            </div>
        </div>
    )
}


export default function CardSection(){
    return(
        <div id = "churchInfo">
            <Cards image="" title="Meet Our Leader" info={lines2} />
            <Cards image="/cross_image.jpg" title="Our Beliefs" info={lines1} reverse = {true} />
        </div>

    )
}