import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'



export default function Home() {
  const [search, setsearch] = useState("");
  const [fooditems, setfooditems] = useState([]);
  const [footcategory, setfoodcategory] = useState([]);

  const onChange = (e) => {
    setsearch(e.target.value);
  }

  const loadData = async () => {

    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/foodData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })

    response = await response.json();
    setfooditems(response[0]);
    setfoodcategory(response[1]);

    //console.log(response[0]);
    //console.log(response[1]);

  }
  useEffect(() => { loadData() }, [])



  return (
    <div>
      <div><Navbar /></div>
      <div>

        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>

          <div className="carousel-inner" id="carousal" style={{height:'600px'}}>


            <div className='carousal-caption d-flex justify-content-center' style={{ zIndex: 10, position: 'absolute', top: '85%', left: '50%', marginLeft:'-50%', width: '100%' }}>
              <div className="d-flex justify-content-center"  >
                <input className="form-control me-2" style={{ width: '700px' }} type="search" placeholder="Search" aria-label="Search" value={search} onChange={onChange} />
                {/* <button className="btn btn-outline-danger" type="submit">Search</button> */}
              </div>
            </div>

            <div className="carousel-item active">
              <img src="https://i.ytimg.com/vi/Do7ZdUodDdw/maxresdefault.jpg" style={{  filter: "brightness(70%)" }} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D" style={{ filter: "brightness(70%)" }} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://thumbs.dreamstime.com/b/easy-quick-paneer-tikka-culinary-journey-to-india-ai-created-content-design-background-instagram-facebook-wall-painting-324450957.jpg" style={{ filter: "brightness(70%)"}} className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

      </div>

      <div className='container'>

        {
          footcategory.length !== 0 ? footcategory.map((data) => {
            return (<div className='row mb-3'>
              <div key={data._id} className='fs-3 m-3'>{data.CategoryName} </div>
              <hr />
              {fooditems.length !== 0 ? fooditems.filter((item) => (item.CategoryName == data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))).map((filteritem) => {
                return (
                  <div key={filteritem._id} className='col-12 col-md-6 col-lg-3'>
                    <Card fooditem={filteritem} options={filteritem.options[0]} des={filteritem.description} />
                  </div>
                )
              }) : <div>No such data found</div>}
            </div>
            )
          }) :
            <div>.....</div>
        }

      </div>

      <div><Footer /></div>
    </div>
  )
}
