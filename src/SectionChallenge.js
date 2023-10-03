import {useState} from "react";

const SectionChallenge = () => {
    return (<div>
        <TextExpander>
            Space travel is the ultimate adventure! Imagine soaring past the stars
            and exploring new worlds. It's the stuff of dreams and science fiction,
            but believe it or not, space travel is a real thing. Humans and robots
            are constantly venturing out into the cosmos to uncover its secrets and
            push the boundaries of what's possible.
        </TextExpander>

        <TextExpander
            collapsedNumWords={10}
            expandButtonText="Show text"
            collapseButtonText="Show Less"
            buttonColor="#ff6622"
        >
            Space travel requires some seriously amazing technology and
            collaboration between countries, private companies, and international
            space organizations. And while it's not always easy (or cheap), the
            results are out of this world. Think about the first time humans stepped
            foot on the moon or when rovers were sent to roam around on Mars.
        </TextExpander>

        <TextExpander expanded={true} className="box">
            Space missions have given us incredible insights into our universe and
            have inspired future generations to keep reaching for the stars. Space
            travel is a pretty cool thing to think about. Who knows what we'll
            discover next!
        </TextExpander>
    </div>)
}


function TextExpander({
                          children,
                          expanded = false,
                          expandButtonText = "Show More",
                          collapseButtonText = "Show Less",
                          buttonColor = "red",
                          className = "",
                          collapsedNumWords = 20,
                      }) {

    const words = children.split(" ");
    const initialWords = words.slice(0, collapsedNumWords).join(" ");
    // console.log(initialWords)
    const [isExpanded, setIsExpanded] = useState(expanded);
    // const buttonText = isExpanded ? collapseButtonText : expandButtonText;


    return <div className={"box"}>{isExpanded ? (<>
        {children}
        <span onClick={() => setIsExpanded(!isExpanded)}
              style={{color: "blue"}}>{collapseButtonText}</span>
    </>) : <>
        {initialWords}
        <span onClick={() => setIsExpanded(!isExpanded)}
              style={{color: buttonColor}}>{expandButtonText}</span>
    </>}</div>;
}


export default SectionChallenge;
