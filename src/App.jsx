import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import pant from '../src/assets/pant.jpg'

function App() {
  const [resdata, setresdata] = useState();
  const [size, setSize] = useState();
  const [price, setprice] = useState(0);
  const [radioToggle, setradioToggle] = useState(true);
  const [radioRegToggle, setradioRegToggle] = useState(true);

  const getdata = async () => {
    let res = await axios.get('http://localhost:8000/getproduct');
    console.log(res.data);
    setresdata(res.data.data);
  }

  useEffect(() => {
    getdata()
  }, [])
  
  console.log(resdata);

  const updatePrice = (size, price) => {
    setSize(size);
    setprice(price);
  }
  const updateFitPrice = (fit) => {
    if (fit == 'regular'){
      if (radioRegToggle)
        setprice(parseInt(price) + 120);
      else
        setprice(parseInt(price) - 120);
      }
    else if (fit == 'slim') {
      if (radioToggle)
        setprice(parseInt(price) + 500);
      else
        setprice(parseInt(price) - 500);
    }
  }
  return (
    <>
      {resdata && resdata.map((e, i) => {

        return <div className='con' key={i}>
          <div className='leftCon'>
            <div>
              <img className='mainImg' src={pant} />
            </div>
          </div>

          <div className='rightCon'>

            <div className='rightTopCon'>
              <div className='priceRange'>
                <h5>{`Rs ${e.PriceList[0].price}- Rs ${e.PriceList[e.PriceList.length - 1].price}`}</h5>
              </div>
              <div >
                <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>{e.Tittle}</p>
              </div>
              <div>
                <p style={{ fontSize: '1.5rem' }}>Size:<span>{size}w</span></p>
              </div>
              <div className='sizeCon'>
                {e.PriceList.map((k) => {
                  return <div className='sizebox' onClick={() => { updatePrice(k.size, k.price) }}>{k.size}w</div>
                })}
              </div>
            </div>

            <div className='rightMiddleCon'>
              <div className='radioCon'>
                <input type='checkbox'  onClick={() => { setradioToggle(pre => !pre); updateFitPrice('slim') }} />
                <p>Slim fit</p>
                <input type='checkbox'  onClick={() => { setradioRegToggle(pre => !pre); updateFitPrice('regular') }} />
                <p>Regular fit</p>
              </div>
              <div>
                <p style={{ fontSize: '1.5rem' }}>{e.Desc}</p>
              </div>

              <div style={{ fontSize: '1.5rem' }} className='amtCon'>
                <p>Rs:{price}</p>
                <p style={{ color: e.stock != "out" ? "rgb(10, 189, 174)" : "red" }}>{e.stock}</p>
              </div>
            </div>

            <div className='rightBottomCon'>
              <button style={{ color: '#fff', backgroundColor: 'black' }}>Add to Cart</button>
              <button style={{ color: '#fff', backgroundColor: 'rgb(10, 189, 174)' }}>Buy Now</button>
            </div>
          </div>
        </div>
      })}
    </>
  )
}

export default App
