import React , {useState, useEffect} from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa'

const url = 'https://course-api.com/react-tabs-project'; //provided by John Smilga

function App() {
  const [data, setData] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setisLoading] = useState(true);

  const fetchData = async () => {
    const response = await fetch(url);
    const newData = await response.json();
    setData(newData);
    setisLoading(false);
  }

  useEffect( () => {
    fetchData();
  }, []);

  if(isLoading){
    return <section>
      <h1>loading</h1>
    </section>
  }

  else{
    //destructuring after loading, so the data array isnt empty
    const {company,dates,duties,title} = data[currentTab];

    return (
      <main>
        <h1 className='main-title'>Experience</h1>
        <section className='container'> 
          <article className='tabs-container'>
            {
              data.map((job,index) => {
                return <button className={`tab-btn ${index === currentTab && 'tab-active'}`} key={job.id} onClick={() => setCurrentTab(index)}>
                  {job.company}
                </button> 
              })
            }
          </article>
          <article className='info-container'>
            <h2>{title}</h2>
            <div className='company'>{company}</div>
            <p className='dates'>{dates}</p>
          
            {
              duties.map((duty, index) => {
                return <div key={index}>
                  <p><FaAngleDoubleRight className='icon'/>{duty}</p>
                </div>
              })
            }
            
          </article>
        </section>
      </main>
    );

  }

  
}

export default App;
