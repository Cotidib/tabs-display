import React , {useState, useEffect} from 'react';
import { FaAngleDoubleRight, FaSpinner } from 'react-icons/fa'

const url = 'https://course-api.com/react-tabs-project'; //provided by John Smilga

function App() {
  const [data, setData] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const [nightMode, setNightsMode] = useState(false);

  const fetchData = async () => {
    const response = await fetch(url);
    const newData = await response.json();
    setData(newData);
    setisLoading(false);
  }

  useEffect( () => {
    fetchData();
  }, []);

  const handleOnChange = () => {
    setNightsMode(!nightMode);
    console.log(nightMode);
  };

  if(isLoading){
    return <section>
      <FaSpinner className="loading"/>
    </section>
  }

  else{
    //destructuring after loading, so the data array isnt empty
    const {company,dates,duties,title} = data[currentTab];

    return (
      <main className={nightMode? 'nm-page' : 'page'}>
        <label className='switch'>
          <input type='checkbox' onChange={handleOnChange}/>
          <span className='slider'/>
        </label>

        <h1 className={nightMode? 'nm-main-title' : 'main-title'}>Experience</h1>
        <section className={nightMode? 'nm-container' : 'container'}> 
          <article className='tabs-container'>
            {
              data.map((job,index) => {
                return <button className={nightMode? `nm-tab-btn ${index === currentTab && 'nm-tab-active'}` : `tab-btn ${index === currentTab && 'tab-active'}`} key={job.id} onClick={() => setCurrentTab(index)}>
                  {job.company}
                </button> 
              })
            }
          </article>
          <article className={nightMode? 'nm-info-container' : 'info-container'}>
            <h2>{title}</h2>
            <div className='company'>{company}</div>
            <p className='dates'>{dates}</p>
          
            {
              duties.map((duty, index) => {
                return <div key={index}>
                  <p className={nightMode? 'nm-duty' : 'duty'}><FaAngleDoubleRight className={nightMode? 'nm-icon' : 'icon'}/>{duty}</p>
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
