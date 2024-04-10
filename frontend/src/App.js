import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
    let [pageAccessData, setPageAccessData] = useState({});
    let [contentName, setContentName] = useState("AboutMe");
    useEffect(() => {
        // AccessCount Call
        accessCountIncr();

        // Fetch data when the component mounts
        fetchData();
      }, []);

    const accessCountIncr = async () => {
        try {
            const response = await fetch('/accessCountApi');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const fetchData = async () => {
        try {
            const response = await fetch('/getAccessCountApi');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
            const data = await response.json();
            setPageAccessData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${getMonthName(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`;
      };
    
    const getMonthName = (monthIndex) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthIndex];
    };

    return (
    <>
        <div className = "heading" >
            <h1 id = "heading" > Arun 's HomePage </h1> 
            <h3 > Welcome to my page!! &#128522; </h3>
            <p>This site has been visited <b>{pageAccessData.ac}</b> times since&nbsp;<b>{formatDate(pageAccessData.from)}</b></p>  
        </div>
            
        <ol className = "nav" >
            <li onClick={() => setContentName("AboutMe")} > AboutMe </li>  
            <li onClick={() => setContentName("BooksRed")} > Books < span className = 'redtext' >R</span>ed</li >
        </ol>
        <hr/>
        
        <Content contentName={contentName} /> 
        <hr/> 
    </>
);
}

function Content({contentName})
{
    let content = (<></>);
    if (contentName == "AboutMe" )
    {
        content=(<div>
            <p> I 'm a Software Engineer at <a href="https://www.zohocorp.com/">Zoho corporation ltd</a>. 
            I studied Bachelor of Engineering in Electronics and Communication Engineering at <a href = "https://trp.srmtrichy.edu.in/" > SRM TRP Engineering College </a>, Batch of 2019.  </p >

            <p > When I 'm not sitting in front of computer, I can be found on my village with my family, 
            hanging out with friends, playing football, batminton, chess, practicing piano,
            watching adventure animation movies, listening to classical musics(western, eastern,
                middleEast), rock & roll, anything that fit my mood, reading philosophies, pondering our existence,
            or wondering the stars of night sky.
            </p> 
            <p className = "badge-base LI-profile-badge"
            data-locale = "en_US"
            data-size = "medium"
            data-theme = "light"
            data-type = "VERTICAL"
            data-vanity = "arunkumarkg"
            data-version = "v1" > 
            <a className = "badge-base__link LI-simple-link" href = "https://in.linkedin.com/in/arunkumarkg?trk=profile-badge" > my linkedIn </a>
            </p >
        </div>);

    }
    else if (contentName == "BooksRed")
    {
        content=(<div >

            <ol>
                <li > Autobiography of Mahatma Gandhi. </li> 
                <li > Autobiography of Benjamin Franklin. </li> 
                <li > Osho 's philosophies.</li>
                <li > Shell Programming in Unix, Linux and OS X. </li> 
                <li > Operating Systems - Three Easy Pieces. </li> 
                <li > Algorithms to liveby. </li> 
                <li > Discrete Mathematics and its Applications. </li>  
            </ol >

            <p> <i> Note: The above books are not part of my academics. </i></p >
        </div>);
    }
    else{
        console.error('Unknown content name');
    }

    return content;
}

export default App;