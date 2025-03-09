const navChange=()=>{
  if(window.innerHeight*0.35 < window.scrollY  ){
      document.querySelector("nav").classList.add("fondoNav")
  }else{
  document.querySelector("nav").classList.remove("fondoNav")
  }
}