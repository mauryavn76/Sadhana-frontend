import React from "react";

function About() {
  return (
    <>
      <div className="h-full w-full flex justify-center items-center flex-col">
        <img
          className="w-full h-[calc(100vh-80px)] hidden md:block "
          src="/images/about.png"
        />
        <div className="">
          {/* <p className="underline text-3xl font-semibold">About Us</p> */}
          <div className="">
            <div
              id="about-main"
              className="flex flex-col md:grid grid-cols-[50%_50%] bg-[#36bcaf] h-full md:h-[calc(100vh-80px)] px-2 text-black mx-5 my-3"
            >
              <div className="text-sm px-10 md:py-5">
                <p className="font-semibold text-3xl text-center text-gray-800 mb-3 mt-3">
                  HUMAN BODY
                </p>
                <div className="h-full md:h-[65vh] overflow-y-auto">
                  <p className="text-base my-0">
                    The Vedas (ancient Hindu Scriptures) state that the human
                    body is a miniature world!
                  </p>
                  <p className="text-base my-0">
                    Majority of People, who have devoted their life in
                    understanding the human body and almighties other creations,
                    admit above. Anatomy of the body is understood by science.
                    But science is still in the process of understanding the
                    exact impact of other factors on body, like good feelings
                    like peace, happiness etc. and bad feelings like lust,
                    wrath, greed, attachment, ego etc.
                  </p>
                  <p className="text-base my-0">
                    But we all know sentiments along with what we eat or drink,
                    what we think, all impact our body.
                  </p>
                  <p className="text-base my-0">
                    Nature, which provides air and water, is the biggest need of
                    the human body. How the body uses them also has impacts on
                    our body. The breath influences our brain and our mind.
                    Scientists have found that when you breathe through the
                    right nostril, the metabolism in your body is twice as much
                    as when you breathe through the left nostril. When you
                    breathe through your left nostril, it affects the right side
                    of your brain, and when you breathe through the right
                    nostril, it affects the left side of the brain. Breath – It
                    is the most important source of energy. The breath can help
                    us energize our whole system. If you are tired, and you try
                    some breathing exercises, change your breathing pattern, you
                    will feel energetic. A few minutes of meditation energizes
                    your system, bringing your mind to a happy and pleasant
                    state.
                  </p>
                </div>
              </div>
              <div id="about" className="px-2 flex ">
                <img
                  className="h-72 md:h-full w-full my-2 flex justify-center items-center "
                  src="/images/about.svg"
                />
              </div>
            </div>
          </div>
          <div
            id="about-main"
            className="flex flex-col md:grid grid-cols-[50%_50%] bg-[#36bcaf] h-full md:h-[calc(100vh-80px)] px-2 text-black mx-5 my-3"
          >
            <div className="text-sm px-8 md:py-5">
              <span className="font-semibold text-3xl pl-1.5 text-gray-800 mt-3">
                SADHANA
              </span>
              <div className="h-full md:h-[65vh] overflow-y-auto">
                <p className=" my-3  text-base">
                  Sadhana refers to the process of mastering (saadh-ne-ko)
                  senses, Sadhana is not a particular aspect of life but it’s an
                  act of continuous nurturing of both internal and external due
                  to absolute devotion towards own will. Human nature needs
                  dynamism, some movement in life for betterment within and
                  outside of himself without that he feels frustrated. He must
                  keep moving to newer and newer possibilities. Sadhana is that
                  which facilitates that.
                </p>
                <p className="px-2 my-0 text-base">
                  Every action can be sadhana, if done with absolute will &
                  nature, it will promote you towards your enrichment. Sadhana
                  does not mean any specific kind of activity such as spiritual
                  ritual, sadhana means you are mastering your action as a tool
                  for your wellbeing.
                </p>
                <p className="px-2 my-0 text-base">
                  Spiritual director and retreat leader Anthony de Mello in the
                  path breaking book speaks boldly in favour of the cultivation
                  of silence and the practice of bringing the whole person —
                  body, mind, soul, imagination, and memory — to prayer. The
                  word “sadhana” is a capacious Indian term rich in meanings. It
                  can refer to discipline, spiritual practice, and one’s
                  personal means for approaching God. De Mello has created 47
                  exercises drawing on Scripture; St. Ignatius, Teresa of Avila,
                  and other mystics; modern psychology; and Eastern techniques
                  such as yoga and Zen Buddhism.
                </p>
              </div>
            </div>
            <div id="about">
              <img
                className="h-96 md:h-full w-full my-2 flex justify-center items-center "
                src="/images/sadhana.jpg"
              />
            </div>
          </div>
          <div
            id="about-main"
            className="flex flex-col md:grid grid-cols-[50%_50%] bg-[#36bcaf] h-full md:h-[calc(100vh-80px)] px-2 text-black mx-5 my-3"
          >
            <div className="text-sm px-8 md:py-5">
              <span className="font-semibold text-3xl pl-1.5 text-gray-800 mt-3">
                ANCIENT CULTURE AND SCIENCE
              </span>
              <div className="h-full md:h-[65vh] overflow-y-auto">
                <p className="px-2 my-0 text-base">
                  Ancient science which could not be preserved has a lot of such
                  information, which science has now started admitting. Science
                  now admits that body cells regenerate and replace old cells on
                  their own and it is an inbuilt auto process. The Nobel Prize
                  in Physiology was awarded to Yoshinori Ohsumi “for his
                  discoveries of mechanisms for autophagy, which confirmed that
                  a major percentage of protein needed by the body is being
                  generated by the body itself by using those dead cells”.
                </p>
                <p className="px-2 my-0 text-base">
                  Significant improvements and research in science has assisted
                  humankind in increasing their life span. But still there are
                  lot of questions, which are beyond the limitations of science
                  and remain unanswered.
                </p>
                <p className="m-0 px-2 my-0 text-base">
                  We believe that human body is the biggest gift provided by
                  almighty to humankind, which cannot be valued. Birth and death
                  are still controlled by the almighty, or else the richest
                  people, the biggest doctors, the biggest scientist, the
                  strongest person would have never died.
                </p>
              </div>
            </div>
            <div id="about">
              <img className="h-full w-full my-2" src="/images/ayur.jpg" />
            </div>
          </div>
          <div
            id="about-main"
            className="flex flex-col md:grid grid-cols-[50%_50%] bg-[#36bcaf] h-full md:h-[calc(100vh-80px)] px-2 text-black mx-5 my-3"
          >
            <div className="text-sm px-8 md:py-5">
              <p className="font-semibold text-3xl pl-1.5 text-gray-800">
                PURPOSE OF THIS WEBSITE
              </p>
              <div className="h-[65vh] overflow-y-auto">
                <p className="px-2 mb-1 text-base ">
                  This website is an effort by Maa Ambey Education and Welfare
                  foundation, a nonprofit organization, to assist and increase
                  awareness in humankind about health, human values and for
                  living a better life by providing and compiling information
                  from various sources, which can help them and assist them, in
                  saving efforts and money
                </p>{" "}
                <p className="px-2 my-0 text-base ">
                  If we are sick or have any physical or mental problems, value
                  of money diminishes, as you cannot enjoy anything, if you are
                  not physically and mentally fit. Value of good health is known
                  only to people who are suffering with some ailment. Effort is
                  this website is to assist humankind for better physical and
                  mental health.
                </p>
                <p className="px-2 my-0 text-base">
                  There are lot of other sciences, other than the conventional
                  allopathic, which are effective and have lesser economic
                  impact on individual. What to eat, how to lead a balanced
                  life, exercise, yoga, home remedies, ayurveda, acupressure,
                  acupuncture, homeopathy and other ancient methods which can
                  assist humankind, prior trying allopathy. Effort is being made
                  to collate such information in handy and precise manner, so
                  that users can have easy access and save their time and money.
                </p>
                <p className="px-2 m-0 my-0 text-base">
                  Allopathy is an outcome of lot of research and efforts, which
                  should not be avoided, as it is result oriented, but other
                  options can be tried prior taking help from allopathy. Trying
                  other things will help because allopathy is expensive, it has
                  side effects, it helps on one organ and have adverse impact on
                  another organ. Moreover, allopathy medicines are generic in
                  nature and effects on probabilities, while as almighty has not
                  created every individual different from other.
                </p>
              </div>
            </div>
            <div id="about">
              <img className="h-full w-full my-2" src="/images/purpose.webp" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;

// return (
//   <div>
//     <div>
//       <div>
//         <div className="h-screen flex md:hidden flex-col w-screen justify-center items-center">
//           <div className="w-full justify-center items-center">
//             <img src="/images/about.jpg" />
//           </div>
//           <div className="w-full space-y-3  px-6">
//             <p className="text-cyan-400 font-bold">WELCOME TO</p>
//             <h1 className="font-bold text-[32px]">About Company</h1>
//             <p>
//               Are constantly thriving to improve our already high standards to
//               have you see us as the absolute best in the industry. It’s not
//               enough to have trust in the cleaning.
//             </p>
//             <h2 className="font-bold text-[20px]">Our Mission</h2>
//             <p>
//               Far far away, behind the word mountains, far from the countries
//               Vokalia and Consonantia.
//             </p>
//             <h2 className="font-bold text-[20px]">Our Vission</h2>
//             <p>
//               Far far away, behind the word mountains, far from the countries
//               Vokalia and Consonantia
//             </p>
//           </div>
//         </div>{' '}
//         <div className="hidden md:flex h-screen  mx-16   justify-center items-center">
//           <div className="w-1/3 space-y-3 ">
//             <p className="text-cyan-400 font-bold">WELCOME TO</p>
//             <h1 className="font-bold text-[32px]">About Company</h1>
//             <p>
//               Are constantly thriving to improve our already high standards to
//               have you see us as the absolute best in the industry. It’s not
//               enough to have trust in the cleaning.
//             </p>
//             <h2 className="font-bold text-[20px]">Our Mission</h2>
//             <p>
//               Far far away, behind the word mountains, far from the countries
//               Vokalia and Consonantia.
//             </p>
//             <h2 className="font-bold text-[20px]">Our Vission</h2>
//             <p>
//               Far far away, behind the word mountains, far from the countries
//               Vokalia and Consonantia
//             </p>
//           </div>
//           <div className=" flex justify-center items-center">
//             <Image
//               src="/images/home-images/about-us.png"
//               width="600%"
//               height="400%"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="flex w-full px-6 py-10 md:flex  md:px-44 md:py-24 bg-[#023C5B]  text-white ">
//         <p>
//           <p>
//             Ancient science which could not be preserved has a lot of such
//             information, which science has now started admitting. Science now
//             admits that body cells regenerate and replace old cells on their
//             own and it is an inbuilt auto process. The Nobel Prize in
//             Physiology was awarded to Yoshinori Ohsumi “for his discoveries of
//             mechanisms for autophagy, which confirmed that a major percentage
//             of protein needed by the body is being generated by the body
//             itself by using those dead cells. The Vedas (ancient Hindu
//             Scriptures) state that the human body is a miniature world!
//             Majority of People, who have devoted their life to understanding
//             the human body and their other
//           </p>
//           creations, admit above. Anatomy of the body is understood by
//           science. But science is still in the process of understanding the
//           impact of other factors on the body, like all good (peace, happiness
//           etc.) and bad (lust, wrath, greed, attachment, ego) sentiments as
//           described in olden times. What we eat or drink, what we think, all
//           impact our body. Nature, which provides air and water, is the
//           biggest need of the human body. How the body uses them also has
//           impacts on our body. The breath influences our brain and our mind.
//           Scientists have found that when you breathe through the right
//           nostril, the metabolism in your body is twice as much as when you
//           breathe through the left nostril. When you breathe through your left
//           nostril, it affects the right side of your brain, and when you
//           breathe through the right nostril, it affects the left side of the
//           brain. Breath – It is the most important source of energy. The
//           breath can help us energize our whole system. If you are tired, and
//           you try some breathing exercises, change your breathing pattern, you
//           will feel energetic. A few minutes of meditation energizes your
//           system, bringing your mind to a happy and pleasant state. Sadhana
//           refers to the process of mastering (saadh-ne-ko) senses, Sadhana is
//           not a particular aspect of life but its a act of continuous
//           nurturing of both internal and external due to absolute devotion
//           towards own will. Human nature needs dynamism, some movement in life
//           for betterment within and outside of himself without that he feels
//           frustrated. He must keep moving to newer and newer possibilities.
//           Sadhana is that which facilitates that. Every action can be sadhana,
//           if done with absolute will & nature, it will promote you towards
//           your enrichment. Sadhana does not mean any specific kind of activity
//           such as spiritual ritual, sadhana means you are mastering your
//           action as a tool for your wellbeing. Spiritual director and retreat
//           leader Anthony de Mello in the path breaking book speaks boldly in
//           favour of the cultivation of silence and the practice of bringing
//           the whole person — body, mind, soul, imagination, and memory — to
//           prayer. The word “sadhana” is a capacious Indian term rich in
//           meanings. It can refer to discipline, spiritual practice, and one’s
//           personal means for approaching God. De Mello has created 47
//           exercises drawing on Scripture; St. Ignatius, Teresa of Avila, and
//           other mystics; modern psychology; and Eastern techniques such as
//           yoga and Zen Buddhism.
//         </p>
//       </div>
//       <Image
//         src="/images/about-us.jpg"
//         width="1000%"
//         height="600%"
//         layout="responsive"
//       />
//     </div>
//     <div className="mb-36p">
//       <div className="flex flex-col bg-white border shadow-2xl md:mx-auto p-16 relative">
//         <h1 className="font-bold text-4xl md:text-center pb-24 ">
//           TESTIMONIALS
//         </h1>
//         <p className="flex  justify-around mt-12">
//           World is committed to making participation in the event harass ment
//           free on experience for everyone, regardless of leve of expenc gender
//           by identity and expression oriention disability for personal
//           informa3tion.
//         </p>
//       </div>
//     </div>

//     <div className="flex flex-col items-center pb-48">
//       <p className="text-cyan-400 font-bold text-xl">TEAM MEMBERS</p>
//       <h1 className="font-bold text-[36px] ">Creative Team</h1>
//     </div>
//     <div className="w-full h-full">
//       <div className="  md:space-x-12 mb-32 md:mx-36 items-center justify-center md:flex  ">
//         <div className=" shadow-black border-2 ">
//           <Image
//             src="/images/aboutfolder/team_13.jpg"
//             height="400%"
//             width="250%"
//           />
//         </div>
//         <div className=" shadow-black border-2 ">
//           <Image
//             src="/images/aboutfolder/team_14.jpg"
//             height="400%"
//             width="250%"
//           />
//         </div>
//         <div className=" shadow-black border-2">
//           <Image
//             src="/images/aboutfolder/team_15.jpg"
//             height="400%"
//             width="250%"
//           />
//         </div>
//         <div className=" shadow-black border-2">
//           <Image
//             src="/images/aboutfolder/team_img-1-2.jpeg"
//             height="400%"
//             width="250%"
//           />
//         </div>
//       </div>
//     </div>
//   </div>
// );
