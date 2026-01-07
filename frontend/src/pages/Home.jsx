import React from 'react'
import { Link } from 'react-router-dom'
import { FaLongArrowAltRight } from "react-icons/fa";
import Texthighlite from "../compotents/utilitycomponents/highLightText"
import CtaButton from '../compotents/utilitycomponents/Button';
import Banner from "../assets/Images/banner.mp4"
import CodeTemplate from '../compotents/home/CodeTemplate';
import CodeWritingAnimation from '../compotents/home/CodeWritingAnimation';
import Timeline from "../compotents/home/Timeline"
import LearningLanguuageSection from "../compotents/home/LearningLanguageSection";
import InstructorSection from "../compotents/home/InstructorSection";
import ReviewSlider from "../compotents/home/ReviewSlider"
import Footer from '../compotents/common/Footer';
const Home = () => {
  return (
    <div className='pt-13'>
      <div className=' flex-col align-middle justify-items-center  '>
        <div className=' hover:scale-95 transition-all duration-200'>
            <Link to="signup">
                <div className='mt-10 p-2 mx-auto bg-richblack-800 rounded-full w-fit
                text-richblack-100 font-bold transition-all duration-200 hover: scale-95'>
                    <div className=' flex w-fit pl-2 pr-2 items-center justify-center gap-2 '>
                    <p>Become An Instructor</p>
                    <FaLongArrowAltRight />
                    </div>
                </div>
            </Link>
        </div>
        <div className=' flex-col w-[80%] mt-5'>
            <div className='justify-center flex text-center text-4xl' >
                <h1>Empower Your Future with <Texthighlite > Coding Skills</Texthighlite> </h1>
            </div>
            <p className=' text-richblack-200 text-center mt-5 text-xl '>
                With our online coding courses, you can learn at your own pace,
                 from anywhere in the world, and get access to a wealth of resources, including hands-on projects, 
                 quizzes, and personalized feedback from instructors.
            </p>

            <div className='flex gap-8 justify-center mt-8'>
               <CtaButton link={"/about"} isactive={true}>Lern more...</CtaButton>
               <CtaButton link={"/about"} isactive={false}>Book a Demo</CtaButton>
            </div>
            
            {/* Video */}
            <div className="mx-3 my-7 shadow-[1px_-3px_10px_-3px] shadow-gray-100">
            <video
                className="shadow-[20px_20px_rgba(255,255,255)]"
                muted
                loop
                autoPlay
            >
                <source src={Banner} type="video/mp4" />
            </video>
            </div>
        </div>

 {/* section 2 */}

        <div className='flex flex-wrap h-fit gap-0 lg:gap-10 justify-between overflow-hidden'>
            <div className='w-[100%] lg:w-[500px] '>  
                <CodeWritingAnimation  
                    codeColor={"text-green-600 "}
                    codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                    backgroundGradient={<div className="codeblock2 absolute"></div>}
                ></CodeWritingAnimation>   
            </div>
            <div className='w-[100%] lg:w-[500px]  '>
                <CodeTemplate
                    heading ={<div>Start <Texthighlite>Coding In Seconds</Texthighlite> </div>}
                    subheading={ <div>
                        Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                    </div> }

                    ctabtn1={{
                        btnText: "Try it Yourself ",
                        link: "/signup",
                        active: true,
                        }}
                    ctabtn2={{
                        btnText: "Learn More",
                        link: "/",
                        active: false,
                        }}
                ></CodeTemplate>
            </div>

        </div>


 {/* section 3* -- white section */}


    <div className='bg-white text-black'>
        <div>
            {/* pending desine*/} 
        </div>

        <div className="mx-auto h-fit flex flex-wrap w-11/12 flex-col items-center justify-between gap-8 ">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10  flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the skills you need for a{" "}
              <Texthighlite>job that is in demand.</Texthighlite>
            </div>
            <div className="flex flex-col items-start font-bold gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The moder CodePlay is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CtaButton isactive={true} linkto={"/signup"}>
                <div className="">Learn More</div>
              </CtaButton>
            </div>
          </div>
        </div>  
        
        <div className='w-11/12 m-10'>
            <Timeline></Timeline>
            <LearningLanguuageSection></LearningLanguuageSection>
        </div>

        
  
    </div> 


 {/* Section 3 */}

    <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Become a instructor section */}
        <InstructorSection />

         {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
    </div>

  </div>
    </div>
  )
}

export default Home
