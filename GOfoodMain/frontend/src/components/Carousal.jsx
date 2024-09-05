import React from 'react'


export default function Carousal() {
  return (
    <div>
<div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  
  <div className="carousel-inner" id="carousal">


  <div className='carousal-caption d-flex justify-content-center' style={{zIndex:10, position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%'}}>
  <form className="d-flex" role="search" >
        <input className="form-control me-2" style={{width: '400px'}} type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-danger" type="submit">Search</button>
      </form>
  </div>



    <div className="carousel-item active">
      <img src="https://img.freepik.com/free-photo/delicious-burger-with-fresh-ingredients_23-2150857908.jpg" style={{opacity:'0.7'}} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://c0.wallpaperflare.com/preview/732/681/139/blur-burn-dark-dawn.jpg" style={{opacity:'0.7'}} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://api.vip.foodnetwork.ca/wp-content/uploads/2023/03/kheer-feat.jpg" style={{opacity:"0.7"}} className="d-block w-100" alt="..."/>
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
  )
}
